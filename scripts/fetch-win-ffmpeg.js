/**
 * Download latest static ffmpeg.exe + ffprobe.exe for Windows (BtbN GPL build)
 * Outputs:
 *   node_modules/@ffmpeg-installer/win32-x64/ffmpeg.exe
 *   node_modules/@ffprobe-installer/win32-x64/ffprobe.exe
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

const FFMPEG_OUT  = path.join(__dirname, '..', 'node_modules', '@ffmpeg-installer',  'win32-x64', 'ffmpeg.exe');
const FFPROBE_OUT = path.join(__dirname, '..', 'node_modules', '@ffprobe-installer', 'win32-x64', 'ffprobe.exe');

const ZIP_URL = 'https://github.com/FFmpeg-Builds/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip';
const TMP_ZIP = path.join(os.tmpdir(), 'ffmpeg-btbn-win64.zip');
const TMP_DIR = path.join(os.tmpdir(), 'ffmpeg-btbn-extract');

const ffmpegOk  = fs.existsSync(FFMPEG_OUT)  && fs.statSync(FFMPEG_OUT).size  > 30_000_000;
const ffprobeOk = fs.existsSync(FFPROBE_OUT) && fs.statSync(FFPROBE_OUT).size > 30_000_000;

if (ffmpegOk && ffprobeOk) {
  console.log('ffmpeg.exe + ffprobe.exe already present, skipping download.');
  process.exit(0);
}

console.log('Downloading ffmpeg Windows binaries (BtbN GPL)...');
try {
  execSync(
    `curl -L --progress-bar -o "${TMP_ZIP}" "${ZIP_URL}"`,
    { stdio: 'inherit' }
  );
} catch (e) {
  console.error('curl download failed:', e.message);
  process.exit(1);
}

console.log('Extracting ffmpeg.exe + ffprobe.exe...');
if (fs.existsSync(TMP_DIR)) fs.rmSync(TMP_DIR, { recursive: true });
fs.mkdirSync(TMP_DIR, { recursive: true });

try {
  execSync(`unzip -o "${TMP_ZIP}" "*/bin/ffmpeg.exe" "*/bin/ffprobe.exe" -d "${TMP_DIR}"`, { stdio: 'pipe' });
} catch (e) {
  console.error('unzip failed:', e.stderr?.toString() || e.message);
  process.exit(1);
}

function findBinary(name) {
  const result = execSync(`find "${TMP_DIR}" -name "${name}"`, { encoding: 'utf8' }).trim().split('\n')[0];
  return result || null;
}

const foundFfmpeg  = findBinary('ffmpeg.exe');
const foundFfprobe = findBinary('ffprobe.exe');

if (!foundFfmpeg)  { console.error('ffmpeg.exe not found in zip');  process.exit(1); }
if (!foundFfprobe) { console.error('ffprobe.exe not found in zip'); process.exit(1); }

fs.mkdirSync(path.dirname(FFMPEG_OUT),  { recursive: true });
fs.mkdirSync(path.dirname(FFPROBE_OUT), { recursive: true });

fs.copyFileSync(foundFfmpeg,  FFMPEG_OUT);
fs.copyFileSync(foundFfprobe, FFPROBE_OUT);
fs.chmodSync(FFMPEG_OUT,  0o755);
fs.chmodSync(FFPROBE_OUT, 0o755);

fs.rmSync(TMP_ZIP, { force: true });
fs.rmSync(TMP_DIR, { recursive: true, force: true });

const ffmpegMB  = Math.round(fs.statSync(FFMPEG_OUT).size  / 1024 / 1024);
const ffprobeMB = Math.round(fs.statSync(FFPROBE_OUT).size / 1024 / 1024);
console.log(`ffmpeg.exe  installed: ${FFMPEG_OUT}  (${ffmpegMB}MB)`);
console.log(`ffprobe.exe installed: ${FFPROBE_OUT} (${ffprobeMB}MB)`);
