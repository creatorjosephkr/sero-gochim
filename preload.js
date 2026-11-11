const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  selectFiles: () => ipcRenderer.invoke('select-files'),
  selectOutputDir: () => ipcRenderer.invoke('select-output-dir'),
  openOutputDir: (dirPath) => ipcRenderer.invoke('open-output-dir', dirPath),
  quitApp: () => ipcRenderer.invoke('quit-app'),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  checkFfmpeg: () => ipcRenderer.invoke('check-ffmpeg'),
  getEncoder: () => ipcRenderer.invoke('get-encoder'),
  platform: process.platform,
  setTitleBarOverlay: (opts) => ipcRenderer.invoke('set-titlebar-overlay', opts),
  onFfmpegMissing: (cb) => ipcRenderer.on('ffmpeg-missing', cb),
  onUpdateAvailable: (cb) => ipcRenderer.on('update-available', (_event, data) => cb(data)),
  probeFile: (filePath) => ipcRenderer.invoke('probe-file', filePath),
  convertFile: (opts) => ipcRenderer.invoke('convert-file', opts),
  cancelConvert: (fileId) => ipcRenderer.invoke('cancel-convert', fileId),
  generatePreview: (filePath) => ipcRenderer.invoke('generate-preview', filePath),
  generateAnimatedPreview: (filePath, duration) =>
    ipcRenderer.invoke('generate-animated-preview', { filePath, duration }),
  probeImage: (filePath) => ipcRenderer.invoke('probe-image', filePath),
  generateImagePreview: (filePath) => ipcRenderer.invoke('generate-image-preview', filePath),
  convertImage: (opts) => ipcRenderer.invoke('convert-image', opts),
  onConvertProgress: (callback) => {
    ipcRenderer.removeAllListeners('convert-progress');
    ipcRenderer.on('convert-progress', (_event, data) => callback(data));
  },
  removeProgressListener: () => {
    ipcRenderer.removeAllListeners('convert-progress');
  },
});
