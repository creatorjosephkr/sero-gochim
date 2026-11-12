<p align="center">
  <img src="/joseph.png" width="60%" alt="크리에이터 요셉" /><br />
  "전문 개발자가 아닌 바이브 코딩을 배우는 반백살 아저씨입니다."
</p>

<br />
<br />
<br />

# 세로 고침 (Sero-Gochim)

**버전 1.1.9**

영상 코덱 변환(H.265 → H.264)과 HEIC 이미지 변환을 위한 macOS / Windows 데스크탑 앱입니다.  
FFmpeg/FFprobe가 앱 안에 내장되어 있어 별도 설치가 필요 없습니다.

> [English version below ↓](#sero-gochim-english)

---

## 주요 기능

- **코덱 변환** — H.265(HEVC) 영상을 H.264로 변환. 원본 해상도·비트레이트·프레임레이트 유지
- **VFR 가변 프레임 오디오 싱크 밀림 방지** — 스마트폰(아이폰/갤럭시) 촬영 영상의 가변 프레임(29.53fps 등)을 고정 프레임(29.97 CFR 등)으로 정규화하고, `aresample` 실시간 오디오-비디오 동기화를 적용하여 프리미어/다빈치 리졸브 등 편집 툴에서 싱크 틀어짐 원천 차단
- **프레임레이트(FPS) 표시 및 변경** — 원본 소스의 프레임레이트(fps) 자동 인식 표시, 개별 및 일괄 변환 시 원하는 FPS(60/50/30/29.97/25/24/23.98)로 변경 지원
- **최신 GPU 하드웨어 가속** — NVIDIA RTX 5050 등 최신 Blackwell/Ada/Ampere GPU 및 Apple Silicon(M시리즈), Intel QuickSync, AMD AMF 완벽 지원 및 모델명 인식
- **해상도 변환** — FHD 1080p / QHD 1440p / UHD(4K) 2160p 리사이즈 + 비트레이트 조정
- **이미지 변환** — HEIC, JPG, PNG 이미지 지원. HEIC 파일은 JPEG로 변환(100% 품질, sRGB IEC61966-2.1 색상 공간)
- **이미지 리사이즈** — 가로/세로 자동 인식 후 영상 편집용 크기(FHD / QHD / UHD) 변환
- **일괄 변환** — 여러 파일 한 번에 처리. 영상(해상도/비트레이트/FPS)/이미지 일괄 설정 독립 지원
- **변환 중지** — 변환 중 언제든 전체 작업 즉시 중단 가능
- **미리보기** — 파일 목록에서 썸네일 및 애니메이션 미리보기 제공
- **한글 / 영어 전환** — 앱 내 버튼으로 언어 즉시 전환
- **다크 / 라이트 테마** — 색상 테마 토글 지원
- **자동 업데이트 알림** — 앱 실행 시 새 버전 출시 여부 자동 확인

---

## 스크린샷

> <img width="1312" height="862" alt="image" src="https://github.com/user-attachments/assets/f2cae8c3-0396-4bf4-a7d3-49c41084ace3" />
> <img width="1312" height="862" alt="image" src="https://github.com/user-attachments/assets/a4bb32e6-0a83-426a-8fcd-ba6e307e2582" />

---

## 설치 방법

[Releases 페이지](https://github.com/creatorjosephkr/sero-gochim/releases)에서 운영체제에 맞는 파일을 다운로드합니다.

| 운영체제 | 파일 | 설명 |
|---|---|---|
| macOS | `Sero-Gochim-v1.1.9-Universal.dmg` | Apple Silicon / Intel 통합(Universal) 빌드 |
| Windows | `Sero-Gochim-v1.1.9-Setup.exe` | 설치 마법사 방식 |
| Windows | `Sero-Gochim-v1.1.9-Portable.exe` | 설치 없이 바로 실행 |

### macOS 설치

1. `Sero-Gochim-v1.1.9-Universal.dmg` 파일을 열고 `Sero-Gochim`을 `Applications` 폴더로 드래그
2. 처음 실행 시 "확인되지 않은 개발자" 경고가 뜨면:
   - **시스템 설정 → 개인 정보 보호 및 보안 → "확인 없이 열기"** 클릭
   - 또는 터미널에서 실행:
     ```bash
     xattr -cr /Applications/Sero-Gochim.app
     ```

### Windows 설치

1. `Sero-Gochim-v1.1.9-Setup.exe`를 실행하고 설치 경로 선택 후 완료
2. 바탕화면 또는 시작 메뉴 바로가기로 실행

---

## 사용 방법

1. **파일 선택** 버튼 또는 드래그 앤 드롭으로 영상(MP4, MKV, MOV, AVI, WebM, TS, MTS, M2TS) 또는 이미지(HEIC, JPG, PNG) 추가
2. 각 파일의 변환 모드 선택:
   - **영상**: 코덱 변환(H.264) 또는 해상도·FPS 설정 (원하는 해상도, 프레임레이트, 비트레이트 선택)
   - **이미지**: 원본 크기 또는 FHD / QHD / UHD(4K)
3. 출력 폴더 지정
4. **모두 변환** 클릭
5. 완료 알림 창에서 결과 확인 및 폴더 열기
6. 변환 중 중단이 필요하면 **변환 중지** 버튼 클릭

---

## 시스템 요구사항

- **macOS**: 10.13 High Sierra 이상
- **Windows**: Windows 10 이상 (64-bit)
- FFmpeg/FFprobe는 앱에 내장되어 있어 별도 설치 불필요

---

## 버전 히스토리

### v1.1.9 (2026.11.12)
- **개선**: 구형 프리미어 프로 CS6 및 레거시 NLE 영상 임포트 시 초록색 화면(Green Screen) 발생 문제 완전 해결
  - **표준 8-bit YUV420P 강제**: 10-bit HDR/NV12/광색역 영상을 필터 그래프(`format=yuv420p`) 및 인코더 레벨에서 표준 8-bit 4:2:0으로 확실히 변환
  - **Rec.709 표준 색공간 및 제한 범위 지정**: `-color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709` 태그를 적용하여 레거시 디코더 디먹싱 호환성 보장
  - **짝수 해상도(mod 2) 자동 정렬**: 원본 크기 유지 시에도 홀수 해상도(스크린 녹화, 크롭 영상 등)로 인한 초록 줄/화면 깨짐 방지 (`scale=trunc(iw/2)*2:trunc(ih/2)*2`)
  - **Closed GOP 및 표준 H.264 High Profile/Level 적용**: 구형 디코더 호환 표준 프로파일과 Closed GOP(`-flags +cgop`) 강제 적용
  - **독점 HDR/Dolby Vision 메타데이터 오염 제거**: 구형 디먹서 파싱 오류를 유발하는 `-map_metadata 0` 제거
  - **오디오 포맷 표준화**: NLE 표준 48kHz 스테레오 AAC(`-ar 48000 -ac 2`) 일괄 적용

### v1.1.8 (2026.11.12)
- **긴급 수정**: 파일 변환 클릭 시 변환 프로세스 초기화 단계에서 발생하던 자바스크립트 오류(`ReferenceError: vs is not defined`) 수정
- **안정성 강화**: 메인 프로세스 비동기 프로브 및 변환 프로세스 예외 처리 방어 코드 보강

### v1.1.7 (2026.11.12)
- **개선**: 가변 프레임레이트(VFR) 영상의 NLE 편집 툴 오디오 싱크 밀림(Drift) 방지 기술 적용
  - 비표준 가변 FPS(29.53fps 등)를 표준 고정 프레임(29.97fps CFR 등)으로 자동 스냅 및 보정
  - `aresample=async=1:first_pts=0` 실시간 오디오-비디오 동기화 및 타임스탬프 원점 재정렬 적용
  - `-fps_mode cfr` 강제 적용으로 장시간 롱테이크 영상에서도 오디오/비디오 싱크 100% 일치 보장

### v1.1.6 (2026.11.12)
- **신규**: 원본 영상 소스의 프레임레이트(FPS) 표시 기능 추가 (파일 메타 정보 및 미리보기 창)
- **신규**: 영상 변환 시 프레임레이트(FPS) 변경 기능 추가 (개별 파일 설정 및 일괄 설정 모두 지원: 60/50/30/29.97/25/24/23.98 fps)
- **개선**: NVIDIA RTX 5050 등 최신 아키텍처 GPU(Blackwell 등) 자동 인식 및 모델명 배지 표시
- **개선**: 듀얼 GPU(노트북 외장 그래픽 등) 환경에서 NVENC 하드웨어 가속 인식 안정성 향상 및 시스템 FFmpeg 연동 지원

### v1.1.5 (2026.11.11)
- **수정**: 카카오뱅크 후원 QR 이미지 표시 오류 수정 (에셋 폴더 경로 대소문자 매칭 및 렌더링 폴백 추가)
- **개선**: NVIDIA RTX 그래픽카드 NVENC 하드웨어 가속 인식 버그 수정 (테스트 해상도 개선)
- **개선**: Windows 환경에서 시스템 FFmpeg 경로 탐색(where/Chocolatey/Winget) 강화

### v1.1.4 (2026.05.21)
- **신규**: 앱 시작 시 Applications에서 다른 버전의 Sero-Gochim 앱 자동 감지 및 제거
- **신규**: DMG 설치 창에 제거 방법 표시
- **신규**: IBM Plex Sans KR 웹폰트 적용으로 타이포그래피 개선
- **개선**: CSS 폰트 스택 최적화

### v1.1.3 (2026.05.20)
- **신규**: JPG, PNG 이미지 파일 지원 추가
- **개선**: 배치설정 UI 최적화 - 이미지만 첨부 시 영상 설정 숨김, 영상만 첨부 시 이미지 설정 숨김
- **개선**: 지원 파일 형식 문서 업데이트

### v1.1.2 (2026.05.15)
- **신규**: 한글/영어 언어 전환 기능 추가
- **신규**: FFmpeg/FFprobe 앱 내장 (별도 설치 불필요)

### v1.0.0~1.1.1
- 초기 기능 구현
- H.265 → H.264 변환
- HEIC 이미지 변환
- 해상도 및 비트레이트 조정
- 배치 변환 기능

---

## 라이선스

ISC License

---

## 앱 개발 응원하기

꾸준한 개발을 응원해 주세요!

- **카카오뱅크** — 앱 내 후원 버튼에서 QR코드 스캔
- **PayPal** — 앱 내 PayPal 버튼으로 이동

---

---

<a name="sero-gochim-english"></a>

# Sero-Gochim

**Version 1.1.9**

A macOS / Windows desktop app for video codec conversion (H.265 → H.264) and HEIC image conversion.  
FFmpeg/FFprobe are bundled inside the app — no separate installation required.

---

## Features

- **Codec Conversion** — Convert H.265 (HEVC) videos to H.264, preserving original resolution, bitrate, and framerate
- **A/V Sync Drift Prevention (VFR to CFR)** — Automatically normalizes variable framerate smartphone videos (e.g. 29.53fps) to constant framerate (29.97 CFR) with real-time `aresample` audio-video synchronization, preventing audio drift in Premiere Pro and DaVinci Resolve
- **Framerate (FPS) Display & Conversion** — Auto-detect original video framerate (fps); support converting to target FPS (60/50/30/29.97/25/24/23.98) individually or in batch
- **Modern GPU Hardware Acceleration** — Full NVENC acceleration for NVIDIA RTX 5050 (Blackwell architecture), RTX 40/30/20 series, Apple Silicon (M-series VideoToolbox), Intel QuickSync, and AMD AMF with GPU model detection badge
- **Resolution Conversion** — Resize to FHD 1080p, QHD 1440p, or UHD (4K) 2160p with bitrate adjustment
- **Image Conversion** — Support for HEIC, JPG, and PNG formats. Convert HEIC files to JPEG (100% quality, sRGB IEC61966-2.1 color space)
- **Image Resizing** — Auto-detect portrait/landscape orientation, resize to video-editing dimensions
- **Batch Conversion** — Process multiple files at once with independent video/image batch settings (Resolution, Bitrate, Framerate)
- **Cancel All** — Stop all ongoing conversions at any time
- **Preview** — Thumbnail and animated preview for files in the list
- **Korean / English UI** — Switch language instantly from within the app
- **Dark / Light Theme** — Toggle color theme at any time
- **Auto Update Notification** — Checks for new releases automatically on startup

---

## Screenshots

> <img width="1312" height="862" alt="image" src="https://github.com/user-attachments/assets/5a989b74-89b5-42a8-b236-b7713b2f1c2d" />
> <img width="1312" height="862" alt="image" src="https://github.com/user-attachments/assets/51f1e3bb-e882-4c4e-9a37-502caeb57fe8" />

---

## Installation

Download the appropriate file from the [Releases page](https://github.com/creatorjosephkr/sero-gochim/releases).

| OS | File | Description |
|---|---|---|
| macOS | `Sero-Gochim-v1.1.9-Universal.dmg` | Universal build (Apple Silicon + Intel) |
| Windows | `Sero-Gochim-v1.1.9-Setup.exe` | Standard installer wizard |
| Windows | `Sero-Gochim-v1.1.9-Portable.exe` | No installation required |

### macOS

1. Open the `Sero-Gochim-v1.1.9-Universal.dmg` file and drag `Sero-Gochim` to the `Applications` folder
2. If you see an "unidentified developer" warning on first launch:
   - Go to **System Settings → Privacy & Security → Open Anyway**
   - Or run in Terminal:
     ```bash
     xattr -cr /Applications/Sero-Gochim.app
     ```

### Windows

1. Run `Sero-Gochim-v1.1.9-Setup.exe`, choose an installation directory, and complete setup
2. Launch from the desktop shortcut or Start Menu

---

## How to Use

1. Click **Select Files** or drag and drop video files (MP4, MKV, MOV, AVI, WebM, TS, MTS, M2TS) or images (HEIC, JPG, PNG)
2. Choose a conversion mode for each file:
   - **Video**: Codec conversion (H.264) or Resolution / FPS settings (custom resolution, framerate, bitrate)
   - **Image**: Original size, FHD, QHD, or UHD (4K)
3. Set an output folder
4. Click **Convert All**
5. View results in the completion dialog and open the output folder
6. Click **Stop** at any time to cancel all ongoing conversions

---

## System Requirements

- **macOS**: 10.13 High Sierra or later
- **Windows**: Windows 10 or later (64-bit)
- FFmpeg/FFprobe are bundled — no separate installation needed

---

## Version History

### v1.1.9 (2026.11.12)
- **Improved**: Fixed solid green screen issue when importing converted MP4 files into legacy NLEs (Adobe Premiere Pro CS6, CS5, etc.)
  - Enforced 8-bit YUV420P across all encoders via explicit filter graph conversion (`format=yuv420p`)
  - Tagged standard Rec.709 color primaries/space/transfer with TV/limited range (`16-235`)
  - Automatic even-dimension (mod 2) alignment (`scale=trunc(iw/2)*2:trunc(ih/2)*2`) preventing odd-dimension decoder corruption
  - Enforced Closed GOP (`-flags +cgop`) and standard H.264 High Profile / compatible Level
  - Stripped proprietary HDR/Dolby Vision atom metadata (`-map_metadata 0` removed) to prevent legacy demuxer parsing errors
  - Standardized audio to 48kHz stereo AAC (`-ar 48000 -ac 2`)

### v1.1.8 (2026.11.12)
- **Hotfix**: Fixed JavaScript uncaught exception (`ReferenceError: vs is not defined`) when clicking file conversion
- **Stability**: Enhanced error handling and scoped variable safety in main process IPC handlers

### v1.1.7 (2026.11.12)
- **Improved**: Added Audio/Video sync drift prevention for Variable Framerate (VFR) smartphone videos in NLE video editors
  - Automatic snapping of non-standard VFR rates (e.g. 29.53fps) to standard constant framerates (e.g. 29.97fps CFR)
  - Real-time audio clock resynchronization (`aresample=async=1:first_pts=0`) and timestamp offset alignment
  - Enforced CFR output mode (`-fps_mode cfr`) for 100% sync lock even on long-take videos

### v1.1.6 (2026.11.12)
- **New**: Added original video source framerate (FPS) display in file list meta and preview modal
- **New**: Added framerate conversion support (individual file controls and batch settings for 60/50/30/29.97/25/24/23.98 fps)
- **Improved**: Added automatic recognition and badge display for NVIDIA RTX 5050 and Blackwell/Ada/Ampere GPU architectures
- **Improved**: Enhanced NVENC detection in multi-GPU / dual-GPU laptop environments with system FFmpeg fallback support

### v1.1.5 (2026.11.11)
- **Fixed**: KakaoBank donation QR code image display issue (asset folder case sensitivity & rendering fallback)
- **Improved**: Fixed NVIDIA RTX GPU NVENC hardware acceleration detection (improved test frame dimensions)
- **Improved**: Enhanced system FFmpeg binary discovery on Windows (where/Chocolatey/Winget)

### v1.1.40 (2026.05.21)
- **New**: Improved typography with IBM Plex Sans KR web font
- **Improved**: Optimized CSS font stack

### v1.1.3 (2026.05.20)
- **New**: Added support for JPG and PNG image files
- **Improved**: Optimized batch settings UI - hides video settings when only images are added, hides image settings when only videos are added
- **Improved**: Updated supported file formats documentation

### v1.1.2 (2026.05.15)
- **New**: Added Korean/English language toggle feature
- **New**: Bundled FFmpeg/FFprobe in the app (no separate installation needed)

### v1.0.0~1.1.1
- Initial implementation
- H.265 → H.264 conversion
- HEIC image conversion
- Resolution and bitrate adjustment
- Batch conversion feature

---

## License

ISC License

---

## Support Development

If you find this app useful, consider supporting development!

- **KakaoBank** — Scan the QR code via the support button in the app
- **PayPal** — Use the PayPal button in the app's support section
