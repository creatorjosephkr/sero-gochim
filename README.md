<p align="center">
  <img src="/joseph.png" width="60%" alt="크리에이터 요셉" /><br />
  "전문 개발자가 아닌 바이브 코딩을 배우는 반백살 아저씨입니다."
</p>

<br />
<br />
<br />

# 세로 고침 (Sero-Gochim)

**버전 1.1.6**

영상 코덱 변환(H.265 → H.264)과 HEIC 이미지 변환을 위한 macOS / Windows 데스크탑 앱입니다.  
FFmpeg/FFprobe가 앱 안에 내장되어 있어 별도 설치가 필요 없습니다.

> [English version below ↓](#sero-gochim-english)

---

## 주요 기능

- **코덱 변환** — H.265(HEVC) 영상을 H.264로 변환. 원본 해상도·비트레이트·프레임레이트 유지
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
| macOS | `Sero-Gochim-v1.1.6-Universal.dmg` | Apple Silicon / Intel 통합(Universal) 빌드 |
| Windows | `Sero-Gochim-v1.1.6-Setup.exe` | 설치 마법사 방식 |
| Windows | `Sero-Gochim-v1.1.6-Portable.exe` | 설치 없이 바로 실행 |

### macOS 설치

1. `Sero-Gochim-v1.1.6-Universal.dmg` 파일을 열고 `Sero-Gochim`을 `Applications` 폴더로 드래그
2. 처음 실행 시 "확인되지 않은 개발자" 경고가 뜨면:
   - **시스템 설정 → 개인 정보 보호 및 보안 → "확인 없이 열기"** 클릭
   - 또는 터미널에서 실행:
     ```bash
     xattr -cr /Applications/Sero-Gochim.app
     ```

### Windows 설치

1. `Sero-Gochim-v1.1.6-Setup.exe`를 실행하고 설치 경로 선택 후 완료
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

**Version 1.1.6**

A macOS / Windows desktop app for video codec conversion (H.265 → H.264) and HEIC image conversion.  
FFmpeg/FFprobe are bundled inside the app — no separate installation required.

---

## Features

- **Codec Conversion** — Convert H.265 (HEVC) videos to H.264, preserving original resolution, bitrate, and framerate
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
| macOS | `Sero-Gochim-v1.1.6-Universal.dmg` | Universal build (Apple Silicon + Intel) |
| Windows | `Sero-Gochim-v1.1.6-Setup.exe` | Standard installer wizard |
| Windows | `Sero-Gochim-v1.1.6-Portable.exe` | No installation required |

### macOS

1. Open the `Sero-Gochim-v1.1.6-Universal.dmg` file and drag `Sero-Gochim` to the `Applications` folder
2. If you see an "unidentified developer" warning on first launch:
   - Go to **System Settings → Privacy & Security → Open Anyway**
   - Or run in Terminal:
     ```bash
     xattr -cr /Applications/Sero-Gochim.app
     ```

### Windows

1. Run `Sero-Gochim-v1.1.6-Setup.exe`, choose an installation directory, and complete setup
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
