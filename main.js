const { app, BrowserWindow, ipcMain, dialog, shell, net } = require('electron');
const path = require('path');
const { spawn, spawnSync } = require('child_process');
const fs = require('fs');

const isWindows = process.platform === 'win32';
const isMac = process.platform === 'darwin';

// ─── Find ffmpeg/ffprobe paths ─────────────────────────────
const platformArch = `${process.platform}-${process.arch}`; // e.g. win32-x64, darwin-arm64
const ffmpegBin  = isWindows ? 'ffmpeg.exe'  : 'ffmpeg';
const ffprobeBin = isWindows ? 'ffprobe.exe' : 'ffprobe';

function getBundledBinary(installerScope, binaryName) {
  const subPkg = `${installerScope}/${platformArch}`;
  const candidates = [];

  if (process.resourcesPath) {
    // 1) extraResources: 바이너리를 resources/ 에 직접 배치 (가장 신뢰도 높음)
    candidates.push(path.join(process.resourcesPath, binaryName));
    // 2) asarUnpack: node_modules 구조 유지
    candidates.push(path.join(process.resourcesPath, 'app.asar.unpacked', 'node_modules', subPkg, binaryName));
  }

  // 3) 개발 모드: main.js 기준 node_modules
  const devPkgPath = path.join(__dirname, 'node_modules', subPkg, binaryName);
  if (isWindows && !app.isPackaged) {
    // Windows 개발 환경에서 fetch-win-ffmpeg.js가 실행되지 않은 경우,
    // npm 기본 패키지(<30MB, NVENC 미지원 구버전) 대신 시스템 FFmpeg을 우선 사용할 수 있도록 확인
    try {
      if (fs.existsSync(devPkgPath) && fs.statSync(devPkgPath).size > 30_000_000) {
        candidates.push(devPkgPath);
      }
    } catch (e) {}
  } else {
    candidates.push(devPkgPath);
  }

  for (const p of candidates) {
    try { if (fs.existsSync(p)) return p; } catch (e) {}
  }
  return null;
}

function findSystemBinary(binaryName) {
  if (isWindows) {
    try {
      const result = spawnSync('where', [binaryName], { encoding: 'utf8' });
      if (result.status === 0 && result.stdout.trim()) {
        const first = result.stdout.trim().split(/\r?\n/)[0].trim();
        if (first && fs.existsSync(first)) return first;
      }
    } catch (e) {}
    for (const p of [
      path.join(process.env.ProgramData || 'C:\\ProgramData', 'chocolatey', 'bin', binaryName),
      'C:\\ffmpeg\\bin\\' + binaryName,
      path.join(process.env.LOCALAPPDATA || '', 'Microsoft', 'WinGet', 'Links', binaryName),
    ]) {
      try {
        if (fs.existsSync(p)) return p;
      } catch (e) {}
    }
  } else {
    try {
      const result = spawnSync('which', [binaryName], { encoding: 'utf8' });
      if (result.status === 0 && result.stdout.trim()) return result.stdout.trim();
    } catch (e) {}
    for (const p of [
      '/opt/homebrew/bin/' + binaryName,
      '/usr/local/bin/' + binaryName,
      '/opt/local/bin/' + binaryName,
    ]) {
      if (fs.existsSync(p)) return p;
    }
  }
  return binaryName;
}

let ffmpegPath  = getBundledBinary('@ffmpeg-installer',  ffmpegBin)  || findSystemBinary(ffmpegBin);
let ffprobePath = getBundledBinary('@ffprobe-installer', ffprobeBin) || findSystemBinary(ffprobeBin);
let activeEncoder = 'libx264';
let detectedGpuName = null;
let activeGpuExtraArgs = [];
let encoderDetectionPromise = null;

// ─── GPU & Hardware Detection ──────────────────────────────
function getGpuModelName() {
  if (isWindows) {
    // 1. nvidia-smi: NVIDIA 그래픽카드(RTX 5050 등 최신 아키텍처 포함) 모델명 조회
    try {
      const res = spawnSync('nvidia-smi', ['--query-gpu=name', '--format=csv,noheader'], { encoding: 'utf8', timeout: 2000 });
      if (res.status === 0 && res.stdout.trim()) {
        const line = res.stdout.trim().split(/\r?\n/)[0].trim();
        if (line) return line;
      }
    } catch (_) {}

    // 2. PowerShell Win32_VideoController
    try {
      const res = spawnSync('powershell', ['-NoProfile', '-Command', 'Get-CimInstance Win32_VideoController | Select-Object -ExpandProperty Name'], { encoding: 'utf8', timeout: 3000 });
      if (res.status === 0 && res.stdout.trim()) {
        const lines = res.stdout.trim().split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
        const dGpu = lines.find((l) => /geforce|rtx|gtx|nvidia|radeon|arc/i.test(l));
        if (dGpu) return dGpu;
        if (lines[0]) return lines[0];
      }
    } catch (_) {}
  } else if (isMac) {
    try {
      const res = spawnSync('sysctl', ['-n', 'machdep.cpu.brand_string'], { encoding: 'utf8', timeout: 1000 });
      if (res.status === 0 && res.stdout.trim()) {
        return res.stdout.trim();
      }
    } catch (_) {}
  }
  return null;
}

// ─── GPU encoder detection ────────────────────────────────
function testEncoder(encoder, bin = ffmpegPath, extraArgs = []) {
  return new Promise((resolve) => {
    // RTX GPU(Turing/Ampere/Ada/Blackwell 등)의 NVENC는 최소 해상도 145x49를 요구합니다.
    // 64x64로 테스트하면 "Frame Dimension less than the minimum supported value" 에러로 실패하므로
    // 모든 GPU 인코더(NVENC, QSV, AMF, VideoToolbox)에서 안전한 256x256 + yuv420p로 테스트합니다.
    const args = [
      '-f', 'lavfi', '-i', 'color=black:s=256x256:d=1',
      '-vframes', '1', '-c:v', encoder,
      ...extraArgs,
      '-pix_fmt', 'yuv420p', '-f', 'null', '-',
    ];
    let stderr = '';
    const proc = spawn(bin, args);
    proc.stderr?.on('data', (d) => { stderr += d.toString(); });
    proc.on('close', (code) => {
      if (code === 0) {
        console.log(`[Encoder] ${encoder} (${path.basename(bin)})${extraArgs.length ? ' ' + extraArgs.join(' ') : ''}: available`);
        resolve(true);
      } else {
        const lastError = stderr.trim().split('\n').filter(Boolean).pop() || '';
        console.log(`[Encoder] ${encoder} (${path.basename(bin)}): not available (code ${code}) ${lastError}`);
        resolve(false);
      }
    });
    proc.on('error', (err) => {
      console.log(`[Encoder] ${encoder} (${path.basename(bin)}): spawn error - ${err.message}`);
      resolve(false);
    });
  });
}

async function detectEncoder() {
  detectedGpuName = getGpuModelName();
  console.log(`[Encoder] Detected GPU hardware: ${detectedGpuName || 'Unknown'}`);
  console.log(`[Encoder] Primary FFmpeg binary: ${ffmpegPath}`);

  // 번들된 FFmpeg 및 시스템 FFmpeg 모두 확인하여 최신 GPU(RTX 5050 등) 하드웨어 가속 지원 보장
  const binariesToTry = [ffmpegPath];
  const systemBin = findSystemBinary(ffmpegBin);
  if (systemBin && systemBin !== ffmpegPath) {
    binariesToTry.push(systemBin);
  }

  const candidates = isMac
    ? ['h264_videotoolbox']
    : ['h264_nvenc', 'h264_qsv', 'h264_amf'];

  for (const bin of binariesToTry) {
    for (const enc of candidates) {
      // 1) 기본 인코더 실행 테스트
      if (await testEncoder(enc, bin)) {
        ffmpegPath = bin;
        activeEncoder = enc;
        activeGpuExtraArgs = [];
        console.log(`[Encoder] Selected: ${enc} via ${bin}`);
        return { encoder: enc, gpuName: detectedGpuName };
      }

      // 2) NVIDIA GPU(RTX 5050 등)의 경우 듀얼 GPU 노트북 환경에서 -gpu 0 / -gpu 1 지정 테스트
      if (enc === 'h264_nvenc') {
        for (const gpuIdx of ['0', '1']) {
          if (await testEncoder(enc, bin, ['-gpu', gpuIdx])) {
            ffmpegPath = bin;
            activeEncoder = enc;
            activeGpuExtraArgs = ['-gpu', gpuIdx];
            console.log(`[Encoder] Selected: ${enc} with -gpu ${gpuIdx} via ${bin}`);
            return { encoder: enc, gpuName: detectedGpuName };
          }
        }
      }
    }
  }

  console.log('[Encoder] Fallback to libx264 (CPU)');
  activeEncoder = 'libx264';
  activeGpuExtraArgs = [];
  return { encoder: 'libx264', gpuName: detectedGpuName };
}

// ─── Build video encoder args ─────────────────────────────
function buildVideoEncoderArgs(encoder, targetBitrate, videoFilter, targetFps) {
  const args = [];
  switch (encoder) {
    case 'h264_videotoolbox':
      args.push('-c:v', 'h264_videotoolbox');
      if (videoFilter) args.push('-vf', videoFilter);
      if (targetFps && targetFps > 0) args.push('-r', `${targetFps}`);
      if (targetBitrate) args.push('-b:v', `${targetBitrate}`);
      break;
    case 'h264_nvenc':
      args.push('-c:v', 'h264_nvenc', '-preset', 'p4', '-pix_fmt', 'yuv420p');
      if (activeGpuExtraArgs && activeGpuExtraArgs.length) args.push(...activeGpuExtraArgs);
      if (videoFilter) args.push('-vf', videoFilter);
      if (targetFps && targetFps > 0) args.push('-r', `${targetFps}`);
      if (targetBitrate) {
        args.push('-b:v', `${targetBitrate}`);
        args.push('-maxrate', `${Math.round(targetBitrate * 1.5)}`);
        args.push('-bufsize', `${Math.round(targetBitrate * 2)}`);
      }
      break;
    case 'h264_qsv':
      args.push('-c:v', 'h264_qsv', '-preset', 'medium', '-pix_fmt', 'yuv420p');
      if (videoFilter) args.push('-vf', videoFilter);
      if (targetFps && targetFps > 0) args.push('-r', `${targetFps}`);
      if (targetBitrate) args.push('-b:v', `${targetBitrate}`);
      break;
    case 'h264_amf':
      args.push('-c:v', 'h264_amf', '-quality', 'balanced', '-pix_fmt', 'yuv420p');
      if (videoFilter) args.push('-vf', videoFilter);
      if (targetFps && targetFps > 0) args.push('-r', `${targetFps}`);
      if (targetBitrate) args.push('-b:v', `${targetBitrate}`);
      break;
    default: // libx264
      args.push('-c:v', 'libx264', '-preset', 'fast', '-pix_fmt', 'yuv420p');
      if (videoFilter) args.push('-vf', videoFilter);
      if (targetFps && targetFps > 0) args.push('-r', `${targetFps}`);
      if (targetBitrate) {
        args.push('-b:v', `${targetBitrate}`);
        args.push('-maxrate', `${Math.round(targetBitrate * 1.5)}`);
        args.push('-bufsize', `${Math.round(targetBitrate * 2)}`);
      }
      break;
  }
  return args;
}

// Start encoder detection (paths already resolved above)
if (app.isReady?.()) {
  encoderDetectionPromise = detectEncoder().then((res) => {
    activeEncoder = res.encoder;
    return res;
  });
} else {
  app.on('ready', () => {
    encoderDetectionPromise = detectEncoder().then((res) => {
      activeEncoder = res.encoder;
      return res;
    });
  });
}

// ─── Cleanup on Startup (Cross-platform) ──────────────────
try {
  if (isWindows) {
    spawn('taskkill', ['/F', '/IM', 'ffmpeg.exe', '/T']);
  } else {
    spawn('pkill', ['ffmpeg']);
  }
} catch (e) {
  // Ignore error if command fails
}

let mainWindow;

function createWindow() {
  const windowConfig = {
    width: 1200,
    height: 750,
    minWidth: 1000,
    backgroundColor: '#f5f5f7',
    titleBarStyle: isMac ? 'hiddenInset' : 'hidden',
    ...(isWindows && {
      titleBarOverlay: { color: '#f0f2f5', symbolColor: '#444444', height: 38 },
    }),
    icon: path.join(__dirname, 'public/icon_64x64.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  };

  mainWindow = new BrowserWindow(windowConfig);
  mainWindow.loadFile('public/index.html');

  mainWindow.webContents.on('did-finish-load', async () => {
    checkForUpdate().then((updateInfo) => {
      if (updateInfo) mainWindow.webContents.send('update-available', updateInfo);
    }).catch(() => {});
  });
}

const CURRENT_VERSION = app.getVersion();
const VERSION_URL = 'https://raw.githubusercontent.com/creatorjosephkr/sero-gochim/main/version.json';

function compareVersions(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    let aVal = pa[i] || 0;
    let bVal = pb[i] || 0;
    
    // 세 번째 자리(패치)부터는 소수로 정규화 (.21 = 0.21, .3 = 0.3)
    if (i >= 2) {
      aVal = aVal / Math.pow(10, String(aVal).length);
      bVal = bVal / Math.pow(10, String(bVal).length);
    }
    
    if (aVal < bVal) return -1;
    if (aVal > bVal) return 1;
  }
  return 0;
}

function checkForUpdate() {
  return new Promise((resolve, reject) => {
    const request = net.request(VERSION_URL);
    let data = '';
    request.on('response', (response) => {
      if (response.statusCode !== 200) { reject(new Error('non-200')); return; }
      response.on('data', (chunk) => { data += chunk; });
      response.on('end', () => {
        try {
          const remote = JSON.parse(data);
          if (compareVersions(CURRENT_VERSION, remote.version) < 0) {
            resolve({
              version: remote.version,
              releaseNotes: remote.releaseNotes || '',
              downloadUrl: remote.downloadUrl || 'https://github.com/creatorjosephkr/sero-gochim/releases',
            });
          } else {
            resolve(null);
          }
        } catch (e) { reject(e); }
      });
    });
    request.on('error', reject);
    request.end();
  });
}

function checkFfmpeg() {
  return new Promise((resolve) => {
    const proc = spawn(ffmpegPath, ['-version']);
    proc.on('close', (code) => resolve(code === 0));
    proc.on('error', () => resolve(false));
  });
}

// ─── macOS: 이전 버전 자동 정리 ─────────────────────────────
function cleanupOldVersions() {
  if (!isMac) return;
  
  try {
    const appName = 'Sero-Gochim';
    const applicationsPath = '/Applications';
    
    if (!fs.existsSync(applicationsPath)) return;
    
    const items = fs.readdirSync(applicationsPath);
    const currentVersion = app.getVersion();
    
    items.forEach((item) => {
      if (item.startsWith(appName) && item.endsWith('.app')) {
        const fullPath = path.join(applicationsPath, item);
        
        // 현재 버전과 다른 앱은 정리
        try {
          const infoPlistPath = path.join(fullPath, 'Contents', 'Info.plist');
          if (fs.existsSync(infoPlistPath)) {
            const plistContent = fs.readFileSync(infoPlistPath, 'utf8');
            // 버전 정보가 있는지 확인 (엄격한 버전 체크)
            if (!plistContent.includes(currentVersion)) {
              // 이전 버전 앱 제거
              spawnSync('rm', ['-rf', fullPath], { stdio: 'ignore' });
              console.log(`[Cleanup] 제거됨: ${fullPath}`);
            }
          }
        } catch (e) {
          console.warn(`[Cleanup] ${item} 처리 중 오류:`, e.message);
        }
      }
    });
  } catch (e) {
    console.warn('[Cleanup] 이전 버전 정리 중 오류:', e.message);
  }
}

app.whenReady().then(() => {
  cleanupOldVersions();
  createWindow();
});

app.on('window-all-closed', () => {
  if (!isMac) app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('before-quit', () => {
  for (const [id, proc] of activeProcesses.entries()) {
    try {
      if (isWindows) {
        spawn('taskkill', ['/F', '/PID', proc.pid.toString(), '/T']);
      } else {
        proc.kill('SIGKILL');
      }
    } catch (e) {}
  }
});

ipcMain.handle('quit-app', () => {
  app.quit();
});

ipcMain.handle('check-ffmpeg', async () => checkFfmpeg());

ipcMain.handle('get-encoder', () => encoderDetectionPromise || Promise.resolve({ encoder: activeEncoder, gpuName: detectedGpuName }));

ipcMain.handle('set-titlebar-overlay', (_event, opts) => {
  if (isWindows && mainWindow) {
    mainWindow.setTitleBarOverlay({ ...opts, height: 38 });
  }
});

ipcMain.handle('open-external', async (_event, url) => {
  await shell.openExternal(url);
});

ipcMain.handle('open-output-dir', async (_event, dirPath) => {
  if (dirPath && fs.existsSync(dirPath)) {
    if (isWindows) {
      // Windows에서는 explorer.exe로 폴더를 열 때 /root 플래그 사용
      // 이렇게 하면 파일이 제대로 표시됨
      spawn('explorer.exe', ['/root,', dirPath]);
    } else {
      // Mac/Linux는 기존 방식 사용
      await shell.openPath(dirPath);
    }
    return true;
  }
  return false;
});

// ─── File Dialog ───────────────────────────────────────────
ipcMain.handle('select-files', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    filters: [{ name: 'Video / Image Files', extensions: ['mp4', 'mkv', 'mov', 'avi', 'webm', 'ts', 'mts', 'm2ts', 'heic', 'heif', 'jpg', 'jpeg', 'png'] }],
  });
  if (result.canceled) return [];
  return result.filePaths;
});

ipcMain.handle('select-output-dir', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory', 'createDirectory'],
  });
  if (result.canceled) return null;
  return result.filePaths[0];
});

// ─── Framerate parsing & standard CFR snapping helper ────
function parseFps(stream) {
  if (!stream) return 0;
  const rates = [stream.avg_frame_rate, stream.r_frame_rate];
  for (const r of rates) {
    if (r && r !== '0/0') {
      const parts = r.split('/');
      if (parts.length === 2) {
        const num = parseFloat(parts[0]);
        const den = parseFloat(parts[1]);
        if (den > 0 && num > 0) {
          const fps = num / den;
          return parseFloat(fps.toFixed(2));
        }
      } else {
        const v = parseFloat(r);
        if (!isNaN(v) && v > 0) return parseFloat(v.toFixed(2));
      }
    }
  }
  return 0;
}

function getStandardFps(fps) {
  if (!fps || fps <= 0) return null;
  // 23.5 ~ 24.3 -> 23.98 / 24
  if (Math.abs(fps - 23.98) < 0.3) return 23.98;
  if (Math.abs(fps - 24) < 0.3) return 24;
  // 24.8 ~ 25.2 -> 25
  if (Math.abs(fps - 25) < 0.3) return 25;
  // 28.5 ~ 30.5 -> 29.97 / 30
  if (Math.abs(fps - 29.97) < 0.6) return 29.97;
  if (Math.abs(fps - 30) < 0.6) return 30;
  // 49.5 ~ 50.5 -> 50
  if (Math.abs(fps - 50) < 0.6) return 50;
  // 58.0 ~ 60.5 -> 59.94 / 60
  if (Math.abs(fps - 59.94) < 1.2) return 59.94;
  if (Math.abs(fps - 60) < 1.2) return 60;
  return null;
}

// ─── Probe file info ──────────────────────────────────────
ipcMain.handle('probe-file', async (_event, filePath) => {
  return new Promise((resolve, reject) => {
    const args = [
      '-v', 'quiet',
      '-print_format', 'json',
      '-show_format',
      '-show_streams',
      filePath,
    ];
    const proc = spawn(ffprobePath, args);
    let stdout = '';
    let stderr = '';
    proc.stdout.on('data', (d) => (stdout += d.toString()));
    proc.stderr.on('data', (d) => (stderr += d.toString()));
    proc.on('error', (err) => reject(err));
    proc.on('close', (code) => {
      if (code !== 0) return reject(new Error(stderr));
      try {
        const info = JSON.parse(stdout);
        const videoStream = info.streams.find((s) => s.codec_type === 'video');
        const audioStream = info.streams.find((s) => s.codec_type === 'audio');
        const isHEVC = videoStream && ['hevc', 'h265'].includes(videoStream.codec_name?.toLowerCase());
        const fps = parseFps(videoStream);
        
        // Get rotation from multiple possible sources
        let rotation = 0;
        
        // 1. Display Matrix check
        if (videoStream?.side_data_list) {
          const dm = videoStream.side_data_list.find(sd => sd.side_data_type === 'Display Matrix');
          if (dm && dm.rotation !== undefined) rotation = dm.rotation;
        }
        
        // 2. Tags check (rotate, com.apple.quicktime.displaymatrix.rotation 등)
        if (!rotation && videoStream?.tags) {
          const tags = videoStream.tags;
          const rotTag = tags.rotate || tags['com.apple.quicktime.displaymatrix.rotation'];
          if (rotTag) rotation = parseInt(rotTag, 10);
        }

        // Normalize rotation to absolute value for 90/270 check
        const absRotation = Math.abs(rotation);
        const isRotated = absRotation === 90 || absRotation === 270;
        
        const actualWidth = isRotated ? parseInt(videoStream.height) : parseInt(videoStream.width);
        const actualHeight = isRotated ? parseInt(videoStream.width) : parseInt(videoStream.height);

        resolve({
          filePath,
          fileName: path.basename(filePath),
          isHEVC,
          codec: videoStream?.codec_name || 'unknown',
          fps,
          width: isNaN(actualWidth) ? 0 : actualWidth,
          height: isNaN(actualHeight) ? 0 : actualHeight,
          bitrate: videoStream?.bit_rate
            ? parseInt(videoStream.bit_rate)
            : info.format?.bit_rate
              ? parseInt(info.format.bit_rate)
              : 0,
          duration: parseFloat(info.format?.duration || '0'),
          rotation,
          audioCodec: audioStream?.codec_name || null,
          fileSize: parseInt(info.format?.size || '0'),
        });
      } catch (e) {
        reject(e);
      }
    });
  });
});

// ─── Image probe (sips on macOS, ffprobe on Windows) ──────
ipcMain.handle('probe-image', async (_event, filePath) => {
  let fileSize = 0;
  try { fileSize = fs.statSync(filePath).size; } catch (_) {}

  if (isMac) {
    return new Promise((resolve, reject) => {
      const proc = spawn('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', filePath]);
      let stdout = '';
      proc.stdout.on('data', (d) => (stdout += d.toString()));
      proc.on('error', (err) => reject(err));
      proc.on('close', (code) => {
        if (code !== 0) return reject(new Error('sips probe failed'));
        const w = stdout.match(/pixelWidth:\s*(\d+)/);
        const h = stdout.match(/pixelHeight:\s*(\d+)/);
        resolve({ isImage: true, width: w ? parseInt(w[1]) : 0, height: h ? parseInt(h[1]) : 0, fileSize });
      });
    });
  }

  // Windows / Linux: ffprobe
  return new Promise((resolve, reject) => {
    const args = ['-v', 'quiet', '-print_format', 'json', '-show_streams', filePath];
    const proc = spawn(ffprobePath, args);
    let stdout = '';
    proc.stdout.on('data', (d) => (stdout += d.toString()));
    proc.on('error', (err) => reject(err));
    proc.on('close', (code) => {
      if (code !== 0) return reject(new Error('ffprobe image probe failed'));
      try {
        const info = JSON.parse(stdout);
        const s = info.streams?.find((s) => s.codec_type === 'video') || info.streams?.[0];
        resolve({ isImage: true, width: parseInt(s?.width) || 0, height: parseInt(s?.height) || 0, fileSize });
      } catch (e) { reject(e); }
    });
  });
});

// ─── Image convert (sips on macOS, ffmpeg on Windows) ─────
ipcMain.handle('convert-image', async (_event, { filePath, outputDir, targetSize }) => {
  const ext = path.extname(filePath);
  const baseName = path.basename(filePath, ext);

  let jpgPath = path.join(outputDir, `${baseName}.jpg`);
  let n = 1;
  while (fs.existsSync(jpgPath)) jpgPath = path.join(outputDir, `${baseName}_${n++}.jpg`);

  if (isMac) {
    const sipsArgs = [
      '-s', 'format', 'jpeg',
      '-s', 'formatOptions', '100',
      '--matchTo', '/System/Library/ColorSync/Profiles/sRGB Profile.icc',
    ];
    if (targetSize) {
      sipsArgs.push('-z', String(targetSize.height), String(targetSize.width));
    }
    sipsArgs.push(filePath, '--out', jpgPath);

    await new Promise((resolve, reject) => {
      const proc = spawn('sips', sipsArgs);
      let stderr = '';
      proc.stderr.on('data', (d) => (stderr += d.toString()));
      proc.on('error', (err) => reject(err));
      proc.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`sips failed: ${stderr}`))));
    });
  } else {
    // Windows / Linux: ffmpeg
    const ffArgs = ['-y', '-i', filePath];
    if (targetSize) {
      ffArgs.push('-vf', `scale=${targetSize.width}:${targetSize.height}`);
    }
    ffArgs.push('-q:v', '2', jpgPath);

    await new Promise((resolve, reject) => {
      const proc = spawn(ffmpegPath, ffArgs);
      let stderr = '';
      proc.stderr.on('data', (d) => (stderr += d.toString()));
      proc.on('error', (err) => reject(err));
      proc.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg image convert failed: ${stderr.slice(-300)}`))));
    });
  }

  return { jpgPath };
});

// ─── Active conversions ───────────────────────────────────
const activeProcesses = new Map();

ipcMain.handle('convert-file', async (_event, { filePath, outputDir, fileId, selectedResolution, targetFps }) => {
  return new Promise((resolve, reject) => {
    // Determine output path
    const ext = path.extname(filePath);
    const baseName = path.basename(filePath, ext);
    let outputPath = path.join(outputDir, `${baseName}_h264.mp4`);
    
    // Avoid overwrite
    let counter = 1;
    while (fs.existsSync(outputPath)) {
      outputPath = path.join(outputDir, `${baseName}_h264_${counter}.mp4`);
      counter++;
    }

    // Probe to get bitrate first
    const probeArgs = [
      '-v', 'quiet', '-print_format', 'json',
      '-show_format', '-show_streams', filePath,
    ];
    const probeProc = spawn(ffprobePath, probeArgs);
    let probeOut = '';
    probeProc.stdout.on('data', (d) => (probeOut += d.toString()));
    probeProc.on('error', (err) => reject(err));
    probeProc.on('close', (probeCode) => {
      try {
        let videoBitrate = null;
        let rotation = 0;
        let probedFps = 0;
        try {
          const info = JSON.parse(probeOut);
          const vs = info.streams?.find((s) => s.codec_type === 'video');
          if (vs) {
            probedFps = parseFps(vs);
            if (vs.bit_rate) videoBitrate = parseInt(vs.bit_rate);
            if (vs.side_data_list) {
              const dm = vs.side_data_list.find((sd) => sd.side_data_type === 'Display Matrix');
              if (dm && dm.rotation !== undefined) rotation = dm.rotation;
            }
            if (!rotation && vs.tags?.rotate) rotation = parseInt(vs.tags.rotate, 10);
          }
          if (!videoBitrate && info.format?.bit_rate) {
            videoBitrate = parseInt(info.format.bit_rate);
          }
        } catch (e) { /* proceed without bitrate info */ }

        // 선택된 해상도가 있으면 사용, 없으면 원본 비트레이트 사용
        let targetBitrate = videoBitrate;
        let scaleFilter = null;

        if (selectedResolution) {
          targetBitrate = Math.floor(selectedResolution.bitrate * 1000); // kbps to bps로 변환
          scaleFilter = `scale=${selectedResolution.width}:${selectedResolution.height}`;
        }

        // 프레임레이트 결정 (사용자 지정값 -> 가변프레임 VFR 표준 스냅 -> 원본 측정값)
        let effectiveFps = targetFps;
        if (!effectiveFps || isNaN(effectiveFps) || effectiveFps <= 0) {
          effectiveFps = getStandardFps(probedFps) || probedFps || null;
        }

        // 비디오 필터 구성 (해상도 스케일링 + 고정 프레임레이트 CFR 강제화)
        const filters = [];
        if (scaleFilter) {
          filters.push(scaleFilter);
        }
        if (effectiveFps && effectiveFps > 0) {
          filters.push(`fps=fps=${effectiveFps}:round=near`);
        }
        const videoFilter = filters.length > 0 ? filters.join(',') : null;

        const args = [
          '-y',
          '-i', filePath,
          ...buildVideoEncoderArgs(activeEncoder, targetBitrate, videoFilter, effectiveFps),
          '-c:a', 'aac',
          '-b:a', '192k',
          '-af', 'aresample=async=1:first_pts=0',
          '-fps_mode', 'cfr',
          '-map_metadata', '0',
          '-movflags', '+faststart',
          '-progress', 'pipe:1',
          outputPath,
        ];

        const proc = spawn(ffmpegPath, args);
        activeProcesses.set(fileId, proc);

        let stderrBuf = '';

        proc.stdout.on('data', (data) => {
          const lines = data.toString().split('\n');
          for (const line of lines) {
            // FFmpeg 8.x uses out_time_us, older versions use out_time_ms
            if (line.startsWith('out_time_us=') || line.startsWith('out_time_ms=')) {
              const val = parseInt(line.split('=')[1]);
              if (!isNaN(val)) {
                // out_time_us is in microseconds, out_time_ms in microseconds too (despite name)
                mainWindow?.webContents.send('convert-progress', {
                  fileId,
                  timeUs: val,
                });
              }
            }
          }
        });

        proc.stderr.on('data', (d) => {
          stderrBuf += d.toString();
        });

        proc.on('close', (code) => {
          activeProcesses.delete(fileId);
          if (code === 0) {
            resolve({ success: true, outputPath });
          } else {
            reject(new Error(`FFmpeg exited with code ${code}: ${stderrBuf.slice(-500)}`));
          }
        });

        proc.on('error', (err) => {
          activeProcesses.delete(fileId);
          reject(err);
        });
      } catch (err) {
        reject(err);
      }
    });
  });
});

ipcMain.handle('cancel-convert', async (_event, fileId) => {
  const proc = activeProcesses.get(fileId);
  if (proc) {
    if (isWindows) {
      spawn('taskkill', ['/F', '/PID', proc.pid.toString(), '/T']);
    } else {
      proc.kill('SIGTERM');
    }
    activeProcesses.delete(fileId);
    return true;
  }
  return false;
});

// ─── Generate HEIC image thumbnail ────────────────────────
ipcMain.handle('generate-image-preview', async (_event, filePath) => {
  return new Promise((resolve) => {
    const tmpDir = path.join(app.getPath('temp'), 'mediaConvert_previews');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
    const thumbPath = path.join(tmpDir, `imgthumb_${Date.now()}_${Math.random().toString(36).slice(2)}.jpg`);

    let proc;
    if (isMac) {
      proc = spawn('sips', ['-s', 'format', 'jpeg', '-Z', '320', filePath, '--out', thumbPath]);
    } else {
      proc = spawn(ffmpegPath, ['-y', '-i', filePath, '-vframes', '1', '-vf', 'scale=320:-2', '-q:v', '3', thumbPath]);
    }

    proc.on('close', (code) => {
      if (code === 0 && fs.existsSync(thumbPath)) {
        const data = fs.readFileSync(thumbPath, 'base64');
        fs.unlinkSync(thumbPath);
        resolve(`data:image/jpeg;base64,${data}`);
      } else {
        resolve(null);
      }
    });
    proc.on('error', () => resolve(null));
  });
});

// ─── Generate preview thumbnail ───────────────────────────
ipcMain.handle('generate-preview', async (_event, filePath) => {
  return new Promise((resolve, reject) => {
    // Generate a thumbnail at 2 seconds
    const tmpDir = path.join(app.getPath('temp'), 'mediaConvert_previews');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
    
    const thumbPath = path.join(tmpDir, `thumb_${Date.now()}_${Math.random().toString(36).slice(2)}.jpg`);
    
    const args = [
      '-y', '-i', filePath,
      '-ss', '2',
      '-vframes', '1',
      '-vf', 'scale=320:-2',
      '-q:v', '3',
      thumbPath,
    ];

    const proc = spawn(ffmpegPath, args);
    proc.on('close', (code) => {
      if (code === 0 && fs.existsSync(thumbPath)) {
        const data = fs.readFileSync(thumbPath, 'base64');
        fs.unlinkSync(thumbPath);
        resolve(`data:image/jpeg;base64,${data}`);
      } else {
        resolve(null);
      }
    });
    proc.on('error', () => resolve(null));
  });
});

// ─── Generate animated preview (short clip) ──────────────
ipcMain.handle('generate-animated-preview', async (_event, { filePath, duration }) => {
  return new Promise((resolve, reject) => {
    const tmpDir = path.join(app.getPath('temp'), 'mediaConvert_previews');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

    const clipPath = path.join(tmpDir, `clip_${Date.now()}_${Math.random().toString(36).slice(2)}.mp4`);
    
    // Take a 5-second clip from 10% into the video
    const startTime = Math.max(0, Math.floor(duration * 0.1));
    
    const args = [
      '-y',
      '-ss', `${startTime}`,
      '-i', filePath,
      '-t', '5',
      '-vf', 'scale=480:-2',
      '-c:v', 'libx264',
      '-preset', 'ultrafast',
      '-crf', '28',
      '-an',
      '-movflags', '+faststart',
      clipPath,
    ];

    const proc = spawn(ffmpegPath, args);
    proc.on('close', (code) => {
      if (code === 0 && fs.existsSync(clipPath)) {
        const data = fs.readFileSync(clipPath, 'base64');
        // Keep file for video element (base64 is fine for short clips)
        fs.unlinkSync(clipPath);
        resolve(`data:video/mp4;base64,${data}`);
      } else {
        resolve(null);
      }
    });
    proc.on('error', () => resolve(null));
  });
});
