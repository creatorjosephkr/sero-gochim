/* ═══════════════════════════════════════════════════════════
   MediaConvert – Renderer
   ═══════════════════════════════════════════════════════════ */

// ─── Encoder Detection ────────────────────────────────────
const ENCODER_LABELS = {
  'h264_videotoolbox': '⚡ VideoToolbox (Apple GPU)',
  'h264_nvenc':        '⚡ NVENC (NVIDIA GPU)',
  'h264_qsv':          '⚡ Quick Sync (Intel GPU)',
  'h264_amf':          '⚡ AMF (AMD GPU)',
  'libx264':           'libx264 (CPU)',
};

let detectedEncoderLabel = null;

function updateEncoderBadge() {
  const badge = document.getElementById('encoder-badge');
  if (!badge) return;
  if (detectedEncoderLabel) {
    badge.textContent = detectedEncoderLabel;
  } else {
    badge.textContent = t('encoder_detecting');
  }
}

window.api.getEncoder().then((res) => {
  const encoder = (typeof res === 'object' && res?.encoder) ? res.encoder : res;
  const gpuName = (typeof res === 'object' && res?.gpuName) ? res.gpuName : null;
  let label = ENCODER_LABELS[encoder] || encoder;
  if (gpuName && encoder !== 'libx264') {
    if (encoder === 'h264_nvenc') label = `⚡ NVENC (${gpuName})`;
    else if (encoder === 'h264_videotoolbox') label = `⚡ VideoToolbox (${gpuName})`;
    else if (encoder === 'h264_qsv') label = `⚡ Quick Sync (${gpuName})`;
    else if (encoder === 'h264_amf') label = `⚡ AMF (${gpuName})`;
  }
  detectedEncoderLabel = label;
  const badge = document.getElementById('encoder-badge');
  if (!badge) return;
  badge.textContent = detectedEncoderLabel;
  badge.classList.toggle('encoder-badge-gpu', encoder !== 'libx264');
});


// ─── i18n ─────────────────────────────────────────────────
const TRANSLATIONS = {
  ko: {
    app_title: '세로 고침 (Sero-Gochim) - 영상/이미지 코덱/형식 변환기 V1.1.9',
    app_subtitle: 'H.265 to H.264 / MOV to MP4 / 이미지 변환(HEIC/JPG/PNG) / 영상 업스케일링 / 가로세로 자동 인식-변환',
    drop_text: 'H.265(HEVC) 영상 파일 또는 이미지(HEIC, JPG, PNG)를 여기로 끌고 와서 놓거나',
    btn_add_files: '파일 선택',
    drop_hint: 'MP4, MKV, MOV, AVI, WebM, TS, HEIC, JPG, PNG 지원',
    list_title: '변환 대기 목록',
    btn_add_more: '추가',
    btn_clear_all: '전체 삭제',
    btn_mode_individual: '개별 설정',
    btn_mode_batch: '일괄 설정',
    batch_video: '영상 변환 설정',
    batch_image: '사진 변환 설정',
    batch_label_res: '해상도 선택',
    batch_label_fps: '프레임레이트',
    batch_label_bitrate: '비트레이트',
    batch_res_double: '원본의 200%',
    batch_res_original: '원본 그대로 (100%)',
    batch_res_half: '원본의 50%',
    batch_fps_original: '원본 유지',
    batch_img_original: '원본',
    output_dir_prefix: '현재폴더/변경',
    output_dir_default: '출력 폴더 선택',
    btn_open_dir: '폴더 열기',
    btn_quit: '종료',
    btn_remove: '제거',
    btn_cancel: '변환 중지',
    toast_cancelled: '변환이 중지되었습니다',
    btn_convert_all: '모두 변환',
    btn_convert_restart: '새로 시작',
    converting_label: '변환 중...',
    file_count: '{0}개',
    bitrate_unknown: '알 수 없음',
    error_probe_fail: '파일을 읽을 수 없습니다',
    copyright: 'Copyright Ⓒ 크리에이터 요셉(creatorjoseph@kakao.com)',
    donate_title: '앱개발 응원하기',
    license_notice: '100% 무료 소프트웨어입니다.',
    modal_update_title: '업데이트 알림',
    modal_update_download: '다운로드',
    modal_update_later: '나중에',
    modal_complete_title: '변환 완료',
    modal_open_dir: '폴더 열기',
    modal_close: '닫기',
    status_pending: '대기 중',
    status_converting: '변환 중...',
    status_done: '✓ 완료',
    status_error: '✕ 오류',
    total_size: '총 크기: {0}',
    overall_progress: '진행: {0}%',
    elapsed: '경과 {0}',
    remaining: '남은 {0}',
    conv_mode_codec: '코덱 변환(H.264)',
    conv_mode_res: '해상도·FPS 설정',
    res_uhd_portrait: 'UHD(세로) 2160×3840 (4K)',
    res_fhd_portrait: 'FHD(세로) 1080×1920',
    bitrate_select: '비율 선택 ▾',
    bitrate_base_info: '기준: {0} kbps (현재 {1}%)',
    img_resize_label: '영상편집용 크기로 맞추기',
    img_res_original: '원본',
    orientation_portrait: '세로(Portrait)',
    orientation_landscape: '가로(Landscape)',
    encoder_detecting: '인코더 감지 중...',
    res_placeholder: '해상도 선택...',
    preview_codec: '코덱',
    preview_resolution: '해상도',
    preview_fps: '프레임레이트',
    preview_bitrate: '비트레이트',
    preview_duration: '길이',
    preview_rotation: '회전',
    preview_generating: '미리보기 생성 중...',
    preview_fail: '미리보기를 생성할 수 없습니다',
    toast_no_output_dir: '출력 폴더를 선택해 주세요',
    toast_no_files: '변환할 파일이 없습니다',
    toast_convert_fail: '{0}개 파일 변환 실패',
    toast_unsupported: '지원하지 않는 파일 형식입니다',
    toast_clear_converting: '변환 중에는 전체 삭제할 수 없습니다',
    toast_ffmpeg_missing: 'FFmpeg를 찾을 수 없습니다. 설치 후 앱을 재시작해 주세요.',
    complete_success: '{0}개 파일 변환 완료',
    complete_fail_suffix: '{0}개 실패',
    update_version_msg: '새 버전 {0}이 출시되었습니다.',
    ffmpeg_checking: '확인 중...',
    ffmpeg_recheck: '다시 확인',
    ffmpeg_overlay_title: 'FFmpeg가 설치되어 있지 않습니다',
    btn_ffmpeg_download: 'FFmpeg 공식 다운로드 페이지 열기',
  },
  en: {
    app_title: 'Sero-Gochim - Video/Image Codec Converter V1.1.9',
    app_subtitle: 'H.265 to H.264 / MOV to MP4 / Image Conversion (HEIC/JPG/PNG) / Video Upscaling / Auto Portrait & Landscape',
    drop_text: 'Drop H.265 video or images (HEIC, JPG, PNG) here, or',
    btn_add_files: 'Select Files',
    drop_hint: 'Supports MP4, MKV, MOV, AVI, WebM, TS, HEIC, JPG, PNG',
    list_title: 'Conversion Queue',
    btn_add_more: 'Add',
    btn_clear_all: 'Clear All',
    btn_mode_individual: 'Individual',
    btn_mode_batch: 'Batch',
    batch_video: 'VIDEO SETTINGS',
    batch_image: 'IMAGE SETTINGS',
    batch_label_res: 'Resolution',
    batch_label_fps: 'Framerate',
    batch_label_bitrate: 'Bitrate',
    batch_res_double: '200% of Original',
    batch_res_original: 'Original (100%)',
    batch_res_half: '50% of Original',
    batch_fps_original: 'Original',
    batch_img_original: 'Original',
    output_dir_prefix: 'Folder/Change',
    output_dir_default: 'Select Output Folder',
    btn_open_dir: 'Open Folder',
    btn_quit: 'Quit',
    btn_remove: 'Remove',
    btn_cancel: 'Stop',
    toast_cancelled: 'Conversion stopped',
    btn_convert_all: 'Convert All',
    btn_convert_restart: 'New',
    file_count: '{0}',
    bitrate_unknown: 'Unknown',
    error_probe_fail: 'Cannot read file',
    converting_label: 'Converting...',
    copyright: 'Copyright Ⓒ CREATOR JOSEPH(creatorjoseph@kakao.com)',
    donate_title: 'Support Development',
    license_notice: '100% Free Software.',
    modal_update_title: 'Update Available',
    modal_update_download: 'Download',
    modal_update_later: 'Later',
    modal_complete_title: 'Done',
    modal_open_dir: 'Open Folder',
    modal_close: 'Close',
    status_pending: 'Pending',
    status_converting: 'Converting...',
    status_done: '✓ Done',
    status_error: '✕ Error',
    total_size: 'Total: {0}',
    overall_progress: 'Progress: {0}%',
    elapsed: 'Elapsed {0}',
    remaining: 'Remaining {0}',
    conv_mode_codec: 'Codec (H.264)',
    conv_mode_res: 'Resolution / FPS',
    res_uhd_portrait: 'UHD(Portrait) 2160×3840 (4K)',
    res_fhd_portrait: 'FHD(Portrait) 1080×1920',
    bitrate_select: 'Select Rate ▾',
    bitrate_base_info: 'Base: {0} kbps (now {1}%)',
    img_resize_label: 'Fit to video editing size',
    img_res_original: 'Original',
    orientation_portrait: 'Portrait',
    orientation_landscape: 'Landscape',
    encoder_detecting: 'Detecting encoder...',
    res_placeholder: 'Select resolution...',
    preview_codec: 'Codec',
    preview_resolution: 'Resolution',
    preview_fps: 'Framerate',
    preview_bitrate: 'Bitrate',
    preview_duration: 'Duration',
    preview_rotation: 'Rotation',
    preview_generating: 'Generating preview...',
    preview_fail: 'Unable to generate preview',
    toast_no_output_dir: 'Please select an output folder',
    toast_no_files: 'No files to convert',
    toast_convert_fail: '{0} file(s) failed',
    toast_unsupported: 'Unsupported file format',
    toast_clear_converting: 'Cannot clear while converting',
    toast_ffmpeg_missing: 'FFmpeg not found. Install it and restart the app.',
    complete_success: '{0} file(s) converted',
    complete_fail_suffix: '{0} failed',
    update_version_msg: 'Version {0} is now available.',
    ffmpeg_checking: 'Checking...',
    ffmpeg_recheck: 'Check Again',
    ffmpeg_overlay_title: 'FFmpeg is not installed',
    btn_ffmpeg_download: 'Open FFmpeg Official Download Page',
  },
};

let currentLang = localStorage.getItem('lang') || 'ko';

function t(key, ...args) {
  let str = (TRANSLATIONS[currentLang] || TRANSLATIONS.ko)[key] || key;
  args.forEach((arg, i) => { str = str.replace(`{${i}}`, arg); });
  return str;
}

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang === 'ko' ? 'ko' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('.btn-lang-toggle').forEach(btn => {
    btn.textContent = lang === 'ko' ? 'EN' : '한글';
  });
  updateEncoderBadge();
  updateUI();
}

function toggleLang() {
  const next = currentLang === 'ko' ? 'en' : 'ko';
  localStorage.setItem('lang', next);
  applyLang(next);
}

(function initLang() {
  const saved = localStorage.getItem('lang') || 'ko';
  currentLang = saved;
  document.documentElement.lang = saved === 'ko' ? 'ko' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('.btn-lang-toggle').forEach(btn => {
    btn.textContent = saved === 'ko' ? 'EN' : '한글';
  });
})();

// ─── Theme ────────────────────────────────────────────────
(function initTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  applyTheme(saved);
})();

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : '');
  document.querySelectorAll('.theme-icon-moon').forEach(el => el.classList.toggle('hidden', isDark));
  document.querySelectorAll('.theme-icon-sun').forEach(el => el.classList.toggle('hidden', !isDark));
  // Windows 타이틀바 오버레이 색상 동기화
  window.api?.setTitleBarOverlay?.(isDark
    ? { color: '#1a1a1a', symbolColor: '#a0a0a0' }
    : { color: '#f0f2f5', symbolColor: '#444444' }
  );
}

function toggleTheme() {
  const current = localStorage.getItem('theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
}

// 플랫폼 감지 — CSS 조건부 표시에 사용
document.documentElement.dataset.platform = window.api.platform;
// Windows 타이틀바 표시
if (window.api.platform === 'win32') {
  document.getElementById('win-titlebar')?.classList.remove('hidden');
}

// ─── Image Resolution Presets ─────────────────────────────
const IMAGE_RESOLUTIONS = {
  fhd: { label: 'FHD 1080p', landscape: { w: 1920, h: 1080 }, portrait: { w: 1080, h: 1920 } },
  qhd: { label: 'QHD 1440p', landscape: { w: 2560, h: 1440 }, portrait: { w: 1440, h: 2560 } },
  uhd: { label: 'UHD(4K) 2160p', landscape: { w: 3840, h: 2160 }, portrait: { w: 2160, h: 3840 } },
};

// ─── State ─────────────────────────────────────────────────
let files = []; // { id, path, name, info, thumbnail, status, progress, elapsedSec, remainingSec }
let outputDir = null;
let isConverting = false;
let fileIdCounter = 0;

// 배치 모드
let batchMode = false;
let batchResolution = 'original'; // 'original' | 'half' | 'double'
let batchFps = 'original'; // 'original' | '60' | '50' | '30' | '25' | '24'
let batchBitratePercent = 100;
let batchImageResolution = null; // null='원본' | 'fhd' | 'qhd' | 'uhd'

// 변환 타이밍
let batchStartTime = null;
let currentFileStartTime = null;
let batchTotalDuration = 0;
let batchProcessedDuration = 0;
let overallElapsedSec = 0;
let overallRemainingSec = null;
let overallProgressPct = 0;

// ─── DOM ──────────────────────────────────────────────────
const dropZone = document.getElementById('drop-zone');
const btnAddFiles = document.getElementById('btn-add-files');
const btnAddMore = document.getElementById('btn-add-more');
const btnClearAll = document.getElementById('btn-clear-all');
const btnConvertAll = document.getElementById('btn-convert-all');
const btnOutputDir = document.getElementById('btn-output-dir');
const btnOpenDir = document.getElementById('btn-open-dir');
const btnQuitApp = document.getElementById('btn-quit-app');
const outputDirLabel = document.getElementById('output-dir-label');
const fileListContainer = document.getElementById('file-list-container');
const fileList = document.getElementById('file-list');
const fileCount = document.getElementById('file-count');
const totalSize = document.getElementById('total-size');
const overallProgress = document.getElementById('overall-progress');

// 현재 변환 중인 파일 ID 추적
let currentConvertingId = null;

// 변환 완료 상태 추적
let isConversionCompleted = false;

// 변환 중지 요청
let cancelRequested = false;

const btnCancelAll = document.getElementById('btn-cancel-all');

// 파일 엘리먼트로 자동 스크롤
function scrollToFileElement(fileId) {
  const fileElement = fileList.querySelector(`[data-id="${fileId}"]`);
  if (fileElement) {
    fileElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Preview modal
const previewModal = document.getElementById('preview-modal');
const previewTitle = document.getElementById('preview-title');
const previewLoading = document.getElementById('preview-loading');
const previewVideo = document.getElementById('preview-video');
const previewImage = document.getElementById('preview-image');
const previewInfo = document.getElementById('preview-info');
const btnClosePreview = document.getElementById('btn-close-preview');

// ─── Toast System ─────────────────────────────────────────
let toastContainer = document.querySelector('.toast-container');
if (!toastContainer) {
  toastContainer = document.createElement('div');
  toastContainer.className = 'toast-container';
  document.body.appendChild(toastContainer);
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toast-out 0.3s var(--ease) forwards';
    toast.addEventListener('animationend', () => toast.remove());
  }, 3500);
}

// ─── Helpers ──────────────────────────────────────────────
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function formatBitrate(bps) {
  if (!bps) return t('bitrate_unknown');
  if (bps >= 1_000_000) return `${(bps / 1_000_000).toFixed(1)} Mbps`;
  return `${(bps / 1_000).toFixed(0)} Kbps`;
}

function getStandardFps(fps) {
  if (!fps || fps <= 0) return null;
  if (Math.abs(fps - 23.98) < 0.3) return 23.98;
  if (Math.abs(fps - 24) < 0.3) return 24;
  if (Math.abs(fps - 25) < 0.3) return 25;
  if (Math.abs(fps - 29.97) < 0.6) return 29.97;
  if (Math.abs(fps - 30) < 0.6) return 30;
  if (Math.abs(fps - 50) < 0.6) return 50;
  if (Math.abs(fps - 59.94) < 1.2) return 59.94;
  if (Math.abs(fps - 60) < 1.2) return 60;
  return null;
}

function generateId() {
  return `file_${++fileIdCounter}_${Date.now()}`;
}

// ─── Resolution Options ───────────────────────────────────
function calculateResolutionOptions(width, height, bitrate) {
  const isPortrait = height > width;
  let options = [];

  if (isPortrait) {
    options = [
      { label: t('res_uhd_portrait'), width: 2160, height: 3840 },
      { label: t('res_fhd_portrait'), width: 1080, height: 1920, isHalf: true },
    ];
  } else {
    options = [
      { label: 'UHD 3840×2160 (4K)', width: 3840, height: 2160 },
      { label: 'FHD 1920×1080', width: 1920, height: 1080, isHalf: true },
    ];
  }

  let originalLabel = `${t('img_res_original')} (${width}×${height})`;
  // 원본 해상도가 표준 해상도와 다르면 그냥 숫자만 표시
  if (!((width === 3840 && height === 2160) || (width === 1920 && height === 1080) ||
        (width === 2160 && height === 3840) || (width === 1080 && height === 1920))) {
    originalLabel = `${width}×${height}`;
  }
  
  options.push({
    label: originalLabel,
    width,
    height,
    isOriginal: true,
  });

  // 각 옵션의 비트레이트 계산 (모두 kbps 단위)
  options = options.map((opt) => {
    if (opt.isOriginal) {
      opt.bitrate = Math.floor(bitrate / 1000);
    } else {
      const isUpscale = opt.width > width || opt.height > height;
      opt.bitrate = isUpscale
        ? Math.floor((bitrate * 2) / 1000)
        : Math.max(500, Math.floor((bitrate * 0.6) / 1000));
    }
    return opt;
  });

  return options;
}

// ─── File Adding ──────────────────────────────────────────
async function addFiles(filePaths) {
  // 새 파일 추가 시 변환 완료 상태 초기화
  if (isConversionCompleted) {
    isConversionCompleted = false;
    resetConvertButton();
  }

  for (const fp of filePaths) {
    // Prevent duplicates
    if (files.some((f) => f.path === fp)) continue;

    const id = generateId();
    const fileExt = fp.split('.').pop().toLowerCase();
    const isImage = ['heic', 'heif', 'jpg', 'jpeg', 'png'].includes(fileExt);
    const file = {
      id,
      path: fp,
      name: fp.split('/').pop(),
      info: null,
      thumbnail: null,
      status: 'pending', // pending | converting | done | error | skipped
      progress: 0,
      error: null,
      outputPath: null,
      isImage,
      imageResolution: null, // null = 원본 | 'fhd' | 'qhd' | 'uhd'
      selectedResolution: null, // { width, height, bitrate, label }
      selectedFps: 'original', // 'original' | '60' | '50' | '30' | '29.97' | '25' | '24' | '23.98'
      baseBitrate: null, // 원본 비트레이트 (kbps)
      conversionMode: 'codec', // 'codec' | 'resolution'
    };
    files.push(file);
  }

  updateUI();

  // Probe files in parallel
  const unprobed = files.filter((f) => !f.info);
  await Promise.allSettled(
    unprobed.map(async (f) => {
      try {
        if (f.isImage) {
          f.info = await window.api.probeImage(f.path);
          f.thumbnail = await window.api.generateImagePreview(f.path);
        } else {
          f.info = await window.api.probeFile(f.path);
          // 기준 비트레이트 설정 (kbps)
          f.baseBitrate = Math.floor(f.info.bitrate / 1000);
          // Set default resolution option (원본 해상도)
          const options = calculateResolutionOptions(f.info.width, f.info.height, f.info.bitrate);
          f.selectedResolution = options[options.length - 1]; // 마지막 항목 (원본)
          // Generate thumbnail
          const thumb = await window.api.generatePreview(f.path);
          if (thumb) f.thumbnail = thumb;
        }
      } catch (err) {
        f.info = { codec: 'error', isHEVC: false };
        f.status = 'error';
        f.error = t('error_probe_fail');
      }
      updateUI();
    })
  );
}

// ─── UI Rendering ─────────────────────────────────────────
function updateUI() {
  const hasFiles = files.length > 0;
  dropZone.classList.toggle('hidden', hasFiles);
  fileListContainer.classList.toggle('hidden', !hasFiles);

  fileCount.textContent = t('file_count', files.length);

  // Total size
  const total = files.reduce((sum, f) => sum + (f.info?.fileSize || 0), 0);
  totalSize.textContent = t('total_size', formatBytes(total));

  updateBatchModeBar();
  renderFileList();

  // Overall timing display
  const isCurrentlyConverting = files.some((f) => f.status === 'converting');
  if (isCurrentlyConverting) {
    overallProgress.classList.remove('hidden');
    let text = t('overall_progress', Math.round(overallProgressPct));
    text += ` | ${t('elapsed', formatDuration(Math.floor(overallElapsedSec)))}`;
    if (overallRemainingSec !== null) {
      text += ` | ${t('remaining', formatDuration(Math.floor(overallRemainingSec)))}`;
    }
    overallProgress.textContent = text;
  } else {
    overallProgress.classList.add('hidden');
  }
}

function updateBatchModeBar() {
  const bar = document.getElementById('batch-mode-bar');
  
  if (files.length >= 2) {
    bar.classList.remove('hidden');
    applyModeToggleUI();
  } else {
    bar.classList.add('hidden');
    // 파일이 1개 이하면 개별 모드로 복귀
    if (batchMode) {
      batchMode = false;
      applyModeToggleUI();
    }
  }
}

function applyModeToggleUI() {
  document.getElementById('btn-mode-individual').classList.toggle('mode-active', !batchMode);
  document.getElementById('btn-mode-batch').classList.toggle('mode-active', batchMode);
  document.getElementById('batch-controls').classList.toggle('hidden', !batchMode);
  
  // 파일 타입별로 배치 섹션 표시/숨기기
  const hasImages = files.some((f) => f.isImage);
  const hasVideos = files.some((f) => !f.isImage);
  
  const videoSection = document.getElementById('batch-section-video');
  const imageSection = document.getElementById('batch-section-image');
  
  if (videoSection) videoSection.classList.toggle('hidden', !hasVideos);
  if (imageSection) imageSection.classList.toggle('hidden', !hasImages);
}

function getEffectiveResolution(f) {
  if (!f.info) return null;
  const { width, height } = f.info;
  let w = width, h = height;
  if (batchResolution === 'double') {
    w = width * 2;
    h = height * 2;
  } else if (batchResolution === 'half') {
    w = Math.floor(width / 2);
    h = Math.floor(height / 2);
    // libx264는 짝수 해상도 필요
    if (w % 2 !== 0) w -= 1;
    if (h % 2 !== 0) h -= 1;
  }
  return {
    width: w,
    height: h,
    bitrate: f.baseBitrate ? Math.max(100, Math.floor(f.baseBitrate * batchBitratePercent / 100)) : null,
    label: 'batch',
  };
}

function renderFileList() {
  // Diff-update approach: only update changed items
  const existingIds = new Set();
  fileList.querySelectorAll('.file-item').forEach((el) => existingIds.add(el.dataset.id));

  const currentIds = new Set(files.map((f) => f.id));

  // Remove deleted items
  fileList.querySelectorAll('.file-item').forEach((el) => {
    if (!currentIds.has(el.dataset.id)) el.remove();
  });

  files.forEach((f, index) => {
    let el = fileList.querySelector(`[data-id="${f.id}"]`);
    if (!el) {
      el = createFileElement(f);
      fileList.appendChild(el);
    }
    updateFileElement(el, f);
  });
}

function createFileElement(f) {
  const div = document.createElement('div');
  div.className = 'file-item';
  div.dataset.id = f.id;

  if (f.isImage) {
    div.innerHTML = `
      <div class="file-item-progress-bg"></div>
      <div class="file-thumb">
        <span class="file-thumb-placeholder">IMG</span>
      </div>
      <div class="file-info">
        <div class="file-name"></div>
        <div class="image-info-row">
          <div class="file-meta">
            <span class="file-resolution"></span>
            <span class="separator">·</span>
            <span class="file-size"></span>
            <span class="separator">·</span>
            <span class="image-output-badge">→ JPEG</span>
          </div>
          <div class="image-res-controls">
            <label class="image-res-label">${t('img_resize_label')}</label>
            <div class="image-res-btns">
              <button class="image-res-btn image-res-btn-active" data-res="original">${t('img_res_original')}</button>
              <button class="image-res-btn" data-res="fhd">FHD 1080p</button>
              <button class="image-res-btn" data-res="qhd">QHD 1440p</button>
              <button class="image-res-btn" data-res="uhd">UHD(4K) 2160p</button>
            </div>
          </div>
        </div>
      </div>
      <div class="file-status">
        <span class="status-text"></span>
        <div class="file-item-actions">
          <button class="btn-icon" data-action="remove" title="${t('btn_remove')}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    `;

    const fileNameEl = div.querySelector('.file-name');
    fileNameEl.textContent = f.name;
    fileNameEl.title = f.name;

    div.addEventListener('click', (e) => {
      const action = e.target.closest('[data-action]')?.dataset.action;
      if (action === 'remove') { removeFile(f.id); return; }

      const resBtn = e.target.closest('.image-res-btn');
      if (resBtn && f.status === 'pending') {
        f.imageResolution = resBtn.dataset.res === 'original' ? null : resBtn.dataset.res;
        div.querySelectorAll('.image-res-btn').forEach(b =>
          b.classList.toggle('image-res-btn-active', b === resBtn));
      }
    });

    return div;
  }

  div.innerHTML = `
    <div class="file-item-progress-bg"></div>
    <div class="file-thumb" data-action="preview">
      <span class="file-thumb-placeholder">...</span>
      <div class="play-overlay">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
      </div>
    </div>
    <div class="file-info">
      <div class="file-name"></div>
    <div class="file-meta">
        <span class="file-codec"></span>
        <span class="separator">·</span>
        <span class="file-resolution"></span>
        <span class="separator file-fps-separator hidden">·</span>
        <span class="file-fps hidden"></span>
        <span class="separator">·</span>
        <span class="file-bitrate"></span>
        <span class="separator">·</span>
        <span class="file-duration"></span>
        <span class="separator">·</span>
        <span class="file-size"></span>
      </div>
      <div class="file-controls">
        <div class="conv-mode-toggle">
          <button class="conv-mode-btn conv-mode-btn-active" data-action="conv-mode" data-mode="codec">${t('conv_mode_codec')}</button>
          <button class="conv-mode-btn" data-action="conv-mode" data-mode="resolution">${t('conv_mode_res')}</button>
        </div>
        <div class="resolution-controls hidden">
          <select class="resolution-selector" data-action="select-resolution">
            <option>${t('res_placeholder')}</option>
          </select>

          <div class="fps-controls">
            <label class="fps-label">${t('batch_label_fps')}</label>
            <select class="fps-selector" data-action="select-fps">
            </select>
          </div>

          <div class="bitrate-controls">
            <label class="bitrate-label">${t('batch_label_bitrate')}</label>
            <div class="bitrate-input-group">
              <input type="number" class="bitrate-input" data-action="bitrate-input" min="100" max="50000" placeholder="${t('batch_label_bitrate')} (kbps)">
              <span class="bitrate-unit">kbps</span>
            </div>
            <div class="bitrate-select-wrap">
              <button class="btn-bitrate-select" data-action="toggle-bitrate-dropdown">${t('bitrate_select')}</button>
              <div class="bitrate-dropdown hidden"></div>
            </div>
            <span class="bitrate-info"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="file-status">
      <span class="status-text"></span>
      <div class="file-item-actions">
        <button class="btn-icon" data-action="remove" title="${t('btn_remove')}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  // 파일명은 textContent로 설정 (HTML 인젝션 방지)
  const fileNameEl = div.querySelector('.file-name');
  fileNameEl.textContent = f.name;
  fileNameEl.title = f.name;

  // Event delegation
  div.addEventListener('click', (e) => {
    const action = e.target.closest('[data-action]')?.dataset.action;
    if (action === 'remove') removeFile(f.id);
    if (action === 'preview') showPreview(f);
    if (action === 'conv-mode') {
      const mode = e.target.closest('[data-mode]')?.dataset.mode;
      if (mode && f.status === 'pending') {
        f.conversionMode = mode;
        updateUI();
      }
    }
    if (action === 'toggle-bitrate-dropdown') {
      const btn = e.target.closest('.btn-bitrate-select');
      const dropdown = e.target.closest('.bitrate-select-wrap')?.querySelector('.bitrate-dropdown');
      if (dropdown && btn) {
        const wasHidden = dropdown.classList.contains('hidden');
        document.querySelectorAll('.bitrate-dropdown').forEach(d => d.classList.add('hidden'));
        if (wasHidden) {
          const rect = btn.getBoundingClientRect();
          const dropdownHeight = 6 * 37;
          const spaceBelow = window.innerHeight - rect.bottom;
          dropdown.style.left = rect.left + 'px';
          dropdown.style.minWidth = rect.width + 'px';
          if (spaceBelow < dropdownHeight + 8) {
            dropdown.style.top = '';
            dropdown.style.bottom = (window.innerHeight - rect.top + 4) + 'px';
          } else {
            dropdown.style.bottom = '';
            dropdown.style.top = (rect.bottom + 4) + 'px';
          }
          dropdown.classList.remove('hidden');
        }
        e.stopPropagation();
      }
    }
    if (action === 'bitrate-preset') {
      const percentage = parseInt(e.target.closest('[data-percentage]')?.dataset.percentage);
      if (f.baseBitrate && f.selectedResolution) {
        const newBitrate = Math.floor(f.baseBitrate * (percentage / 100));
        f.selectedResolution.bitrate = newBitrate;
        e.target.closest('.bitrate-dropdown')?.classList.add('hidden');
        updateUI();
      }
    }
  });

  // Resolution selector change
  const resolutionSelector = div.querySelector('.resolution-selector');
  resolutionSelector.addEventListener('change', (e) => {
    const options = calculateResolutionOptions(f.info.width, f.info.height, f.info.bitrate);
    const selectedIndex = parseInt(e.target.value);
    if (selectedIndex >= 0 && options[selectedIndex]) {
      f.selectedResolution = options[selectedIndex];
      updateUI();
    }
  });

  // FPS selector change
  const fpsSelector = div.querySelector('.fps-selector');
  fpsSelector?.addEventListener('change', (e) => {
    f.selectedFps = e.target.value;
  });

  // Bitrate input change
  const bitrateInput = div.querySelector('.bitrate-input');
  bitrateInput.addEventListener('change', (e) => {
    const newBitrate = parseInt(e.target.value);
    if (!isNaN(newBitrate) && newBitrate > 0 && f.selectedResolution) {
      f.selectedResolution.bitrate = newBitrate;
      updateUI();
    }
  });

  return div;
}

function updateFileElement(el, f) {
  // Update classes
  el.className = `file-item ${f.status === 'converting' ? 'converting' : ''} ${f.status === 'done' ? 'done' : ''} ${f.status === 'error' ? 'error' : ''}`;

  // Progress bar
  const progressBg = el.querySelector('.file-item-progress-bg');
  if (f.status === 'converting') {
    progressBg.style.width = `${f.progress}%`;
  } else if (f.status === 'done') {
    progressBg.style.width = '100%';
    progressBg.style.background = 'linear-gradient(90deg, rgba(34,197,94,0.18), rgba(34,197,94,0.12))';
  } else {
    progressBg.style.width = '0%';
  }

  if (f.isImage) {
    // Thumbnail
    const thumb = el.querySelector('.file-thumb');
    if (f.thumbnail && !thumb.querySelector('img')) {
      thumb.querySelector('.file-thumb-placeholder').classList.add('hidden');
      const img = document.createElement('img');
      img.src = f.thumbnail;
      img.onerror = () => { img.remove(); thumb.querySelector('.file-thumb-placeholder')?.classList.remove('hidden'); };
      thumb.insertBefore(img, thumb.firstChild);
    }
    // Meta
    if (f.info) {
      el.querySelector('.file-resolution').textContent = `${f.info.width}×${f.info.height}`;
      el.querySelector('.file-size').textContent = formatBytes(f.info.fileSize);
    }
    // Update translatable labels
    const imgResLabel = el.querySelector('.image-res-label');
    if (imgResLabel) imgResLabel.textContent = t('img_resize_label');
    const originalResBtn = el.querySelector('.image-res-btn[data-res="original"]');
    if (originalResBtn) originalResBtn.textContent = t('img_res_original');
    const removeBtn = el.querySelector('[data-action="remove"]');
    if (removeBtn) removeBtn.title = t('btn_remove');
    // Resolution buttons
    el.querySelectorAll('.image-res-btn').forEach(b => {
      const val = b.dataset.res === 'original' ? null : b.dataset.res;
      b.classList.toggle('image-res-btn-active', val === f.imageResolution);
      b.disabled = batchMode || f.status !== 'pending';
    });
    el.classList.toggle('batch-disabled', batchMode && f.status === 'pending');
    // Status
    const statusText = el.querySelector('.status-text');
    if (f.status === 'pending') {
      statusText.className = 'status-text';
      statusText.textContent = t('status_pending');
    } else if (f.status === 'converting') {
      statusText.className = 'status-text converting';
      statusText.innerHTML = `<span class="mini-spinner" style="display:inline-block;vertical-align:middle;margin-right:6px"></span>${t('status_converting')}`;
    } else if (f.status === 'done') {
      statusText.className = 'status-text done';
      statusText.textContent = t('status_done');
    } else if (f.status === 'error') {
      statusText.className = 'status-text error';
      statusText.textContent = t('status_error');
    }
    return;
  }

  // Thumbnail
  const thumb = el.querySelector('.file-thumb');
  if (f.thumbnail) {
    const existing = thumb.querySelector('img');
    if (!existing) {
      thumb.querySelector('.file-thumb-placeholder').classList.add('hidden');
      const img = document.createElement('img');
      img.src = f.thumbnail;
      thumb.insertBefore(img, thumb.firstChild);
    }
  }

  // Meta info
  if (f.info) {
    const codecBadge = el.querySelector('.file-codec');
    // HEVC일 경우 "HEVC(H.265)" 표시
    const codecLabel = f.info.isHEVC ? 'HEVC(H.265)' : f.info.codec;
    codecBadge.innerHTML = `<span class="codec-badge ${f.info.isHEVC ? 'hevc' : 'other'}">${codecLabel}</span>`;

    el.querySelector('.file-resolution').textContent = `${f.info.width}×${f.info.height}`;

    // Framerate (FPS) 표시
    const fpsEl = el.querySelector('.file-fps');
    const fpsSep = el.querySelector('.file-fps-separator');
    if (f.info.fps) {
      if (fpsEl) {
        fpsEl.textContent = `${f.info.fps} fps`;
        fpsEl.classList.remove('hidden');
      }
      if (fpsSep) fpsSep.classList.remove('hidden');
    } else {
      if (fpsEl) fpsEl.classList.add('hidden');
      if (fpsSep) fpsSep.classList.add('hidden');
    }

    el.querySelector('.file-bitrate').textContent = formatBitrate(f.info.bitrate);
    el.querySelector('.file-duration').textContent = formatDuration(f.info.duration);
    el.querySelector('.file-size').textContent = formatBytes(f.info.fileSize);

    // Orientation 표시
    const meta = el.querySelector('.file-meta');
    let orientationEl = meta.querySelector('.orientation-badge');
    if (!orientationEl) {
      orientationEl = document.createElement('span');
      orientationEl.className = 'orientation-badge';
      meta.appendChild(orientationEl);
    }
    
    // main.js에서 회전값이 이미 계산된 width/height를 주므로 단순 비교만 수행
    const isPortrait = f.info.height > f.info.width;
    
    orientationEl.textContent = isPortrait ? t('orientation_portrait') : t('orientation_landscape');

    // Resolution selector 업데이트
    const resolutionSelector = el.querySelector('.resolution-selector');
    const options = calculateResolutionOptions(f.info.width, f.info.height, f.info.bitrate);
    
    resolutionSelector.innerHTML = '';
    options.forEach((opt, idx) => {
      const optEl = document.createElement('option');
      optEl.value = idx;
      optEl.textContent = opt.label;
      if (f.selectedResolution && 
          f.selectedResolution.width === opt.width && 
          f.selectedResolution.height === opt.height) {
        optEl.selected = true;
      }
      resolutionSelector.appendChild(optEl);
    });

    // FPS selector 업데이트
    const fpsSelector = el.querySelector('.fps-selector');
    if (fpsSelector) {
      const curFps = f.selectedFps || 'original';
      fpsSelector.innerHTML = '';
      
      let origLabel = `${t('batch_fps_original')}${f.info?.fps ? ` (${f.info.fps} fps)` : ''}`;
      const snappedFps = getStandardFps(f.info?.fps);
      if (f.info?.fps && snappedFps && Math.abs(f.info.fps - snappedFps) >= 0.05) {
        origLabel = `${t('batch_fps_original')} (${f.info.fps} fps → ${snappedFps} CFR 보정)`;
      }

      const fpsOptions = [
        { value: 'original', label: origLabel },
        { value: '60', label: '60 fps' },
        { value: '50', label: '50 fps' },
        { value: '30', label: '30 fps' },
        { value: '29.97', label: '29.97 fps (NTSC)' },
        { value: '25', label: '25 fps (PAL)' },
        { value: '24', label: '24 fps' },
        { value: '23.98', label: '23.98 fps' },
      ];
      fpsOptions.forEach((opt) => {
        const optEl = document.createElement('option');
        optEl.value = opt.value;
        optEl.textContent = opt.label;
        if (opt.value === curFps) optEl.selected = true;
        fpsSelector.appendChild(optEl);
      });
    }
    const fpsLabel = el.querySelector('.fps-label');
    if (fpsLabel) fpsLabel.textContent = t('batch_label_fps');

    // 비트레이트 컨트롤 업데이트
    const bitrateInput = el.querySelector('.bitrate-input');
    const bitrateInfo = el.querySelector('.bitrate-info');
    if (bitrateInput && bitrateInfo && f.selectedResolution && f.baseBitrate) {
      bitrateInput.value = f.selectedResolution.bitrate;
      const percentage = Math.round((f.selectedResolution.bitrate / f.baseBitrate) * 100);
      bitrateInfo.textContent = t('bitrate_base_info', f.baseBitrate.toLocaleString(), percentage);
    }

    // 비율 선택 드롭다운 항목 생성
    const dropdown = el.querySelector('.bitrate-dropdown');
    if (dropdown && f.baseBitrate && dropdown.children.length === 0) {
      [200, 150, 100, 75, 50, 35].forEach(pct => {
        const kbps = Math.floor(f.baseBitrate * pct / 100);
        const btn = document.createElement('button');
        btn.className = 'bitrate-dropdown-item';
        btn.dataset.action = 'bitrate-preset';
        btn.dataset.percentage = String(pct);
        btn.innerHTML = `<span class="bdi-pct">${pct}%</span><span class="bdi-val">${kbps.toLocaleString()} kbps</span>`;
        dropdown.appendChild(btn);
      });
    }

    // 모드 토글 버튼
    const disableMode = batchMode || f.status !== 'pending';
    el.querySelectorAll('.conv-mode-btn').forEach(b => {
      b.classList.toggle('conv-mode-btn-active', b.dataset.mode === f.conversionMode);
      b.disabled = disableMode;
      b.textContent = b.dataset.mode === 'codec' ? t('conv_mode_codec') : t('conv_mode_res');
    });
    const removeBtnV = el.querySelector('[data-action="remove"]');
    if (removeBtnV) removeBtnV.title = t('btn_remove');
    const btnBitrateSelectLabel = el.querySelector('.btn-bitrate-select');
    if (btnBitrateSelectLabel) btnBitrateSelectLabel.textContent = t('bitrate_select');

    // resolution-controls 표시/숨김
    const resControls = el.querySelector('.resolution-controls');
    const showResControls = f.conversionMode === 'resolution' && !batchMode;
    resControls?.classList.toggle('hidden', !showResControls);

    // 변환 중/완료이거나 일괄 모드면 개별 컨트롤 비활성화
    const disableControls = batchMode || f.status !== 'pending';
    resolutionSelector.disabled = disableControls;
    if (fpsSelector) fpsSelector.disabled = disableControls;
    if (bitrateInput) bitrateInput.disabled = disableControls;
    const btnBitrateSelect = el.querySelector('.btn-bitrate-select');
    if (btnBitrateSelect) btnBitrateSelect.disabled = disableControls;
    el.classList.toggle('batch-disabled', batchMode && f.status === 'pending');
  }

  // Status text
  const statusText = el.querySelector('.status-text');
  if (f.status === 'pending') {
    statusText.className = 'status-text';
    statusText.textContent = t('status_pending');
  } else if (f.status === 'converting') {
    statusText.className = 'status-text converting';
    let statusHtml = `<span class="mini-spinner" style="display:inline-block;vertical-align:middle;margin-right:6px"></span>${Math.round(f.progress)}%`;
    if (f.remainingSec != null) {
      statusHtml += ` · ${t('remaining', formatDuration(Math.floor(f.remainingSec)))}`;
    }
    statusText.innerHTML = statusHtml;
  } else if (f.status === 'done') {
    statusText.className = 'status-text done';
    statusText.textContent = t('status_done');
  } else if (f.status === 'error') {
    statusText.className = 'status-text error';
    statusText.textContent = t('status_error');
  }
}

function removeFile(id) {
  const f = files.find((f) => f.id === id);
  if (f && f.status === 'converting') {
    window.api.cancelConvert(f.id);
  }
  files = files.filter((f) => f.id !== id);
  const el = fileList.querySelector(`[data-id="${id}"]`);
  if (el) el.remove();
  updateUI();
  if (files.length === 0) {
    dropZone.classList.remove('hidden');
    fileListContainer.classList.add('hidden');
  }
}

// ─── Preview ──────────────────────────────────────────────
async function showPreview(f) {
  previewModal.classList.remove('hidden');
  previewTitle.textContent = f.name;
  previewLoading.classList.remove('hidden');
  previewVideo.classList.add('hidden');
  previewImage.classList.add('hidden');

  // Show file info
  if (f.info) {
    const fpsHtml = f.info.fps ? `<span>${t('preview_fps')}: <strong>${f.info.fps} fps</strong></span>` : '';
    previewInfo.innerHTML = `
      <span>${t('preview_codec')}: <strong>${f.info.codec}</strong></span>
      <span>${t('preview_resolution')}: <strong>${f.info.width}×${f.info.height}</strong></span>
      ${fpsHtml}
      <span>${t('preview_bitrate')}: <strong>${formatBitrate(f.info.bitrate)}</strong></span>
      <span>${t('preview_duration')}: <strong>${formatDuration(f.info.duration)}</strong></span>
      <span>${t('preview_rotation')}: <strong>${f.info.rotation}°</strong></span>
    `;
  }

  try {
    // Try animated preview first
    const clipData = await window.api.generateAnimatedPreview(f.path, f.info?.duration || 0);
    previewLoading.classList.add('hidden');

    if (clipData) {
      previewVideo.src = clipData;
      previewVideo.classList.remove('hidden');
    } else if (f.thumbnail) {
      previewImage.src = f.thumbnail;
      previewImage.classList.remove('hidden');
    } else {
      previewLoading.querySelector('p').textContent = t('preview_fail');
    }
  } catch (err) {
    previewLoading.classList.add('hidden');
    if (f.thumbnail) {
      previewImage.src = f.thumbnail;
      previewImage.classList.remove('hidden');
    }
  }
}

function closePreview() {
  previewModal.classList.add('hidden');
  previewVideo.pause();
  previewVideo.src = '';
}

// ─── Conversion ───────────────────────────────────────────
async function convertAll() {
  if (isConverting) return;

  if (!outputDir) {
    outputDir = await window.api.selectOutputDir();
    if (!outputDir) {
      showToast(t('toast_no_output_dir'), 'error');
      return;
    }
    const fn = outputDir.split(/[\\/]/).pop();
    outputDirLabel.textContent = fn.length > 20 ? fn.slice(0, 20) + '…' : fn;
    document.getElementById('output-dir-prefix')?.classList.remove('hidden');
    btnOpenDir.classList.remove('hidden');
  }

  isConverting = true;
  cancelRequested = false;
  btnConvertAll.disabled = true;
  btnConvertAll.innerHTML = `<div class="mini-spinner"></div> ${t('converting_label')}`;
  btnCancelAll?.classList.remove('hidden');

  const convertable = files.filter((f) => f.status === 'pending');

  if (convertable.length === 0) {
    showToast(t('toast_no_files'), 'error');
    resetConvertButton();
    return;
  }

  // 배치 타이밍 초기화
  batchStartTime = Date.now();
  batchTotalDuration = convertable.reduce((sum, f) => sum + (f.info?.duration || 0), 0);
  batchProcessedDuration = 0;
  overallElapsedSec = 0;
  overallRemainingSec = null;
  overallProgressPct = 0;

  // Listen for progress
  window.api.onConvertProgress(({ fileId, timeUs }) => {
    const f = files.find((f) => f.id === fileId);
    if (f && f.info && f.status === 'converting') {
      const progressSec = timeUs / 1_000_000;
      f.progress = Math.min(100, (progressSec / f.info.duration) * 100);

      // 파일별 타이밍
      const fileElapsed = (Date.now() - currentFileStartTime) / 1000;
      f.elapsedSec = fileElapsed;
      if (f.progress > 2) {
        f.remainingSec = Math.max(0, fileElapsed / (f.progress / 100) - fileElapsed);
      }

      // 전체 타이밍
      overallElapsedSec = (Date.now() - batchStartTime) / 1000;
      if (batchTotalDuration > 0) {
        const processed = batchProcessedDuration + progressSec;
        const frac = processed / batchTotalDuration;
        overallProgressPct = Math.min(100, frac * 100);
        if (frac > 0.01) {
          overallRemainingSec = Math.max(0, overallElapsedSec / frac - overallElapsedSec);
        }
      }

      updateUI();
    }
  });

  let successCount = 0;
  let errorCount = 0;

  for (const f of convertable) {
    if (cancelRequested) {
      f.status = 'pending';
      f.progress = 0;
      updateUI();
      continue;
    }

    currentConvertingId = f.id;
    currentFileStartTime = Date.now();
    f.status = 'converting';
    f.progress = 0;
    f.elapsedSec = 0;
    f.remainingSec = null;
    updateUI();
    
    // 현재 변환 중인 파일로 자동 스크롤
    scrollToFileElement(f.id);

    try {
      if (f.isImage) {
        let targetSize = null;
        const resolvedImgRes = batchMode ? batchImageResolution : f.imageResolution;
        if (resolvedImgRes && f.info) {
          const isPortrait = f.info.height > f.info.width;
          const dim = IMAGE_RESOLUTIONS[resolvedImgRes][isPortrait ? 'portrait' : 'landscape'];
          targetSize = { width: dim.w, height: dim.h };
        }
        const result = await window.api.convertImage({ filePath: f.path, outputDir, targetSize });
        f.status = 'done';
        f.progress = 100;
        f.outputPath = result.jpgPath;
      } else {
        const resolution = batchMode
          ? getEffectiveResolution(f)
          : f.conversionMode === 'codec'
            ? { width: f.info.width, height: f.info.height, bitrate: f.baseBitrate, label: 'original' }
            : f.selectedResolution;

        const targetFps = batchMode
          ? (batchFps !== 'original' ? parseFloat(batchFps) : null)
          : (f.conversionMode === 'resolution' && f.selectedFps && f.selectedFps !== 'original'
              ? parseFloat(f.selectedFps)
              : null);

        const result = await window.api.convertFile({
          filePath: f.path,
          outputDir,
          fileId: f.id,
          selectedResolution: resolution,
          targetFps,
        });
        f.status = 'done';
        f.progress = 100;
        f.outputPath = result.outputPath;
      }
      successCount++;
    } catch (err) {
      f.status = 'error';
      f.error = err.message;
      errorCount++;
    }

    batchProcessedDuration += f.info?.duration || 0;
    updateUI();
  }

  window.api.removeProgressListener();
  currentConvertingId = null;
  isConverting = false;
  btnCancelAll?.classList.add('hidden');

  if (cancelRequested) {
    cancelRequested = false;
    resetConvertButton();
    showToast(t('toast_cancelled'), 'info');
    updateUI();
    return;
  }

  isConversionCompleted = true;

  // 버튼을 "새로 시작"으로 변경
  btnConvertAll.disabled = false;
  btnConvertAll.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
      <path d="M21 3v5h-5"/>
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
      <path d="M3 21v-5h5"/>
    </svg>
    ${t('btn_convert_restart')}
  `;

  if (successCount > 0) {
    new Audio('./sound/success.mp3').play().catch(() => {});
    showCompleteModal(successCount, errorCount);
  }
  if (errorCount > 0 && successCount === 0) {
    showToast(t('toast_convert_fail', errorCount), 'error');
  }
}

function resetConvertButton() {
  isConverting = false;
  isConversionCompleted = false;
  btnConvertAll.disabled = false;
  btnConvertAll.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
    ${t('btn_convert_all')}
  `;
}

// ─── Event Listeners ──────────────────────────────────────

// File dialog
btnAddFiles.addEventListener('click', async () => {
  const paths = await window.api.selectFiles();
  if (paths.length > 0) await addFiles(paths);
});

btnAddMore.addEventListener('click', async () => {
  const paths = await window.api.selectFiles();
  if (paths.length > 0) await addFiles(paths);
});

// Output dir
btnOutputDir.addEventListener('click', async () => {
  const dir = await window.api.selectOutputDir();
  if (dir) {
    outputDir = dir;
    const folderName = dir.split(/[\\/]/).pop();
    outputDirLabel.textContent = folderName.length > 30 ? folderName.slice(0, 30) + '…' : folderName;
    document.getElementById('output-dir-prefix')?.classList.remove('hidden');
    btnOpenDir.classList.remove('hidden');
  }
});

// Open output dir
btnOpenDir.addEventListener('click', () => {
  if (outputDir) {
    window.api.openOutputDir(outputDir);
  }
});

// Clear all
btnClearAll.addEventListener('click', () => {
  if (isConverting) {
    showToast(t('toast_clear_converting'), 'error');
    return;
  }
  files.forEach((f) => {
    if (f.status === 'converting') window.api.cancelConvert(f.id);
  });
  files = [];
  fileList.innerHTML = '';
  updateUI();
});

// Convert / Restart
btnConvertAll.addEventListener('click', () => {
  if (isConversionCompleted) {
    // "새로 시작" 클릭: 파일 목록 초기화 + 모든 상태 리셋
    files.forEach((f) => {
      if (f.status === 'converting') window.api.cancelConvert(f.id);
    });
    files = [];
    fileList.innerHTML = '';
    resetConvertButton();
    updateUI();
  } else {
    // "모두 변환" 클릭: 변환 시작
    convertAll();
  }
});

// Cancel all conversions
btnCancelAll?.addEventListener('click', () => {
  if (!isConverting) return;
  cancelRequested = true;
  files.filter(f => f.status === 'converting').forEach(f => window.api.cancelConvert(f.id));
});

// Theme toggle (헤더 + macOS drag-bar + Windows titlebar)
document.getElementById('btn-theme-toggle')?.addEventListener('click', toggleTheme);
document.getElementById('btn-theme-mac')?.addEventListener('click', toggleTheme);
document.getElementById('btn-theme-win')?.addEventListener('click', toggleTheme);

// Language toggle
document.getElementById('btn-lang-toggle')?.addEventListener('click', toggleLang);
document.getElementById('btn-lang-mac')?.addEventListener('click', toggleLang);
document.getElementById('btn-lang-win')?.addEventListener('click', toggleLang);

// 배치 모드 토글
document.getElementById('btn-mode-individual')?.addEventListener('click', () => {
  if (!batchMode) return;
  batchMode = false;
  applyModeToggleUI();
  renderFileList();
});

document.getElementById('btn-mode-batch')?.addEventListener('click', () => {
  if (batchMode) return;
  batchMode = true;
  applyModeToggleUI();
  renderFileList();
});

// 배치 해상도 옵션
document.getElementById('batch-res-group')?.addEventListener('click', (e) => {
  const btn = e.target.closest('.batch-opt[data-value]');
  if (!btn) return;
  batchResolution = btn.dataset.value;
  document.querySelectorAll('#batch-res-group .batch-opt').forEach(b =>
    b.classList.toggle('batch-opt-active', b === btn));

  // 해상도에 따라 비트레이트 자동 설정
  if (batchResolution === 'double') {
    batchBitratePercent = 200;
    document.querySelectorAll('#batch-br-group .batch-opt').forEach(b =>
      b.classList.toggle('batch-opt-active', b.dataset.value === '200'));
  } else if (batchResolution === 'half') {
    batchBitratePercent = 60;
    document.querySelectorAll('#batch-br-group .batch-opt').forEach(b =>
      b.classList.toggle('batch-opt-active', b.dataset.value === '60'));
  } else if (batchResolution === 'original') {
    batchBitratePercent = 100;
    document.querySelectorAll('#batch-br-group .batch-opt').forEach(b =>
      b.classList.toggle('batch-opt-active', b.dataset.value === '100'));
  }
});

// 배치 프레임레이트 옵션
document.getElementById('batch-fps-group')?.addEventListener('click', (e) => {
  const btn = e.target.closest('.batch-opt[data-value]');
  if (!btn) return;
  batchFps = btn.dataset.value;
  document.querySelectorAll('#batch-fps-group .batch-opt').forEach(b =>
    b.classList.toggle('batch-opt-active', b === btn));
});

// 배치 이미지 크기 옵션
document.getElementById('batch-img-res-group')?.addEventListener('click', (e) => {
  const btn = e.target.closest('.batch-opt[data-value]');
  if (!btn) return;
  batchImageResolution = btn.dataset.value === 'original' ? null : btn.dataset.value;
  document.querySelectorAll('#batch-img-res-group .batch-opt').forEach(b =>
    b.classList.toggle('batch-opt-active', b === btn));
});

// 배치 비트레이트 옵션
document.getElementById('batch-br-group')?.addEventListener('click', (e) => {
  const btn = e.target.closest('.batch-opt[data-value]');
  if (!btn) return;
  batchBitratePercent = parseInt(btn.dataset.value);
  document.querySelectorAll('#batch-br-group .batch-opt').forEach(b =>
    b.classList.toggle('batch-opt-active', b === btn));
});

// 드롭다운 외부 클릭 시 닫기
document.addEventListener('click', () => {
  document.querySelectorAll('.bitrate-dropdown').forEach(d => d.classList.add('hidden'));
});

// Donate — PayPal
document.getElementById('btn-donate-paypal')?.addEventListener('click', () => {
  window.api.openExternal('https://www.paypal.com/paypalme/tech1010?locale.x=ko_KR&country.x=KR');
});

// Update Available Modal
const updateModal = document.getElementById('update-modal');
let updateDownloadUrl = '';
window.api.onUpdateAvailable((info) => {
  document.getElementById('update-modal-version').textContent = t('update_version_msg', info.version);
  document.getElementById('update-modal-notes').textContent = info.releaseNotes || '';
  updateDownloadUrl = info.downloadUrl;
  updateModal?.classList.remove('hidden');
});
document.getElementById('btn-close-update')?.addEventListener('click', () => {
  updateModal?.classList.add('hidden');
});
document.getElementById('update-modal-backdrop')?.addEventListener('click', () => {
  updateModal?.classList.add('hidden');
});
document.getElementById('btn-update-download')?.addEventListener('click', () => {
  if (updateDownloadUrl) window.api.openExternal(updateDownloadUrl);
  updateModal?.classList.add('hidden');
});

// Conversion Complete Modal
const completeModal = document.getElementById('complete-modal');
function showCompleteModal(successCount, errorCount) {
  const parts = [];
  if (successCount > 0) parts.push(t('complete_success', successCount));
  if (errorCount > 0) parts.push(t('complete_fail_suffix', errorCount));
  document.getElementById('complete-modal-desc').textContent = parts.join(' · ');
  completeModal?.classList.remove('hidden');
}
document.getElementById('btn-close-complete')?.addEventListener('click', () => {
  completeModal?.classList.add('hidden');
});
document.getElementById('complete-modal-backdrop')?.addEventListener('click', () => {
  completeModal?.classList.add('hidden');
});
document.getElementById('btn-open-dir-modal')?.addEventListener('click', () => {
  if (outputDir) window.api.openOutputDir(outputDir);
  completeModal?.classList.add('hidden');
});

// Donate — KakaoBank QR
const qrModal = document.getElementById('qr-modal');
document.getElementById('btn-donate-kakao')?.addEventListener('click', () => {
  qrModal?.classList.remove('hidden');
});
document.getElementById('btn-close-qr')?.addEventListener('click', () => {
  qrModal?.classList.add('hidden');
});
document.getElementById('qr-modal-backdrop')?.addEventListener('click', () => {
  qrModal?.classList.add('hidden');
});

// Quit App
btnQuitApp?.addEventListener('click', () => {
  window.api.quitApp();
});

// Preview modal close
btnClosePreview.addEventListener('click', closePreview);
previewModal.querySelector('.modal-backdrop').addEventListener('click', closePreview);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !previewModal.classList.contains('hidden')) {
    closePreview();
  }
});

// ─── Drag & Drop ──────────────────────────────────────────
document.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.stopPropagation();
});

document.addEventListener('drop', (e) => {
  e.preventDefault();
  e.stopPropagation();
});

dropZone.addEventListener('dragenter', (e) => {
  e.preventDefault();
  dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', (e) => {
  e.preventDefault();
  if (!dropZone.contains(e.relatedTarget)) {
    dropZone.classList.remove('drag-over');
  }
});

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
});

dropZone.addEventListener('drop', async (e) => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  const droppedFiles = Array.from(e.dataTransfer.files);
  const acceptedPaths = droppedFiles
    .filter((f) => {
      const ext = f.name.split('.').pop().toLowerCase();
      return ['mp4', 'mkv', 'mov', 'avi', 'webm', 'ts', 'mts', 'm2ts', 'heic', 'heif'].includes(ext);
    })
    .map((f) => f.path);

  if (acceptedPaths.length > 0) {
    await addFiles(acceptedPaths);
  } else {
    showToast(t('toast_unsupported'), 'error');
  }
});

// Also allow drop on entire window when file list is visible
document.body.addEventListener('dragenter', (e) => {
  e.preventDefault();
  if (files.length > 0 && !isConverting) {
    // Visual feedback could be added here
  }
});

document.body.addEventListener('drop', async (e) => {
  e.preventDefault();
  if (e.target.closest('.drop-zone')) return; // handled by drop zone

  const droppedFiles = Array.from(e.dataTransfer.files);
  const acceptedPaths = droppedFiles
    .filter((f) => {
      const ext = f.name.split('.').pop().toLowerCase();
      return ['mp4', 'mkv', 'mov', 'avi', 'webm', 'ts', 'mts', 'm2ts', 'heic', 'heif'].includes(ext);
    })
    .map((f) => f.path);

  if (acceptedPaths.length > 0) {
    await addFiles(acceptedPaths);
  }
});
