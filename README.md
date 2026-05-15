# 세로 고침 (Sero-Gochim)

**버전 1.1.0**

영상 코덱 변환(H.265 → H.264)과 HEIC 이미지 변환을 위한 macOS / Windows 데스크탑 앱입니다.

> [English version below ↓](#sero-gochim-english)

---

## 주요 기능

- **코덱 변환** — H.265(HEVC) 영상을 H.264로 변환. 원본 해상도·비트레이트 유지
- **해상도 변환** — FHD 1080p / QHD 1440p / UHD(4K) 2160p 리사이즈 + 비트레이트 조정
- **HEIC 이미지 변환** — iPhone·Mac HEIC 파일을 JPEG(100% 품질, sRGB IEC61966-2.1 색상 공간)으로 변환
- **이미지 리사이즈** — 가로/세로 자동 인식 후 영상 편집용 크기(FHD / QHD / UHD) 변환
- **일괄 변환** — 여러 파일 한 번에 처리. 영상/이미지 일괄 설정 독립 지원
- **미리보기** — 파일 목록에서 썸네일 및 애니메이션 미리보기 제공
- **자동 업데이트 알림** — 앱 실행 시 새 버전 출시 여부 자동 확인

---

## 스크린샷

> <img width="1312" height="862" alt="image" src="https://github.com/user-attachments/assets/cf02288a-f141-416b-85d5-d5839c853b41" />

> <img width="1312" height="895" alt="image" src="https://github.com/user-attachments/assets/a7d6c5f8-a07d-42ed-a2ec-6d6269d2a163" />

> <img width="1312" height="895" alt="image" src="https://github.com/user-attachments/assets/5aa028bf-e84e-4b28-823b-221f9884c668" />

---

## 설치 방법

### 1단계 — FFmpeg 설치 (필수)

세로 고침은 영상 변환에 [FFmpeg](https://ffmpeg.org/)를 사용합니다. 앱 실행 전에 반드시 설치해야 합니다.

#### macOS

[Homebrew](https://brew.sh/) 설치를 권장합니다.

```bash
# Homebrew 설치 (이미 있으면 생략)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# FFmpeg 설치
brew install ffmpeg
```

설치 확인:
```bash
ffmpeg -version
```

#### Windows

1. [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html) 에서 Windows 빌드 다운로드
2. 압축 해제 후 `bin` 폴더 경로(예: `C:\ffmpeg\bin`)를 시스템 환경 변수 `PATH`에 추가
3. 명령 프롬프트(cmd)에서 설치 확인:
   ```
   ffmpeg -version
   ```

---

### 2단계 — 앱 설치

[Releases 페이지](https://github.com/creatorjosephkr/sero-gochim/releases)에서 운영체제에 맞는 파일을 다운로드합니다.

| 운영체제 | 파일 | 설명 |
|---|---|---|
| macOS | `.dmg` | Apple Silicon / Intel 통합(Universal) 빌드 |
| Windows | `Setup.exe` | 설치 마법사 방식 |
| Windows | `Portable.exe` | 설치 없이 바로 실행 |

#### macOS 설치

1. `.dmg` 파일을 열고 `Sero-Gochim`을 `Applications` 폴더로 드래그
2. 처음 실행 시 "확인되지 않은 개발자" 경고가 뜨면:
   - **시스템 설정 → 개인 정보 보호 및 보안 → "확인 없이 열기"** 클릭
   - 또는 터미널에서 실행:
     ```bash
     xattr -cr /Applications/Sero-Gochim.app
     ```

#### Windows 설치

1. `Setup.exe`를 실행하고 설치 경로 선택 후 완료
2. 바탕화면 또는 시작 메뉴 바로가기로 실행

---

## 직접 빌드하기

**요구 사항**

- [Node.js](https://nodejs.org/) 18 이상
- FFmpeg (위 설치 방법 참고)

**빌드 절차**

```bash
# 저장소 클론
git clone https://github.com/creatorjosephkr/sero-gochim.git
cd sero-gochim

# 의존성 설치
npm install

# 개발 모드 실행
npm start

# macOS용 DMG 빌드
npm run build:mac

# Windows용 EXE 빌드 (Windows 환경 필요)
npm run build:win

# macOS + Windows 동시 빌드
npm run build:all
```

빌드 결과물은 `dist/` 폴더에 생성됩니다.

---

## 사용 방법

1. **파일 추가** 버튼으로 영상(MP4, MKV, MOV, AVI, WebM, TS, MTS, M2TS) 또는 이미지(HEIC, HEIF) 선택
2. 각 파일의 변환 모드 선택:
   - **영상**: 코덱 변환(H.264) 또는 해상도 변환
   - **이미지**: 원본 크기 또는 FHD / QHD / UHD(4K)
3. 출력 폴더 지정
4. **모두 변환** 클릭
5. 완료 알림 창에서 결과 확인 및 폴더 열기

---

## 시스템 요구사항

- **macOS**: 10.13 High Sierra 이상
- **Windows**: Windows 10 이상 (64-bit)
- **FFmpeg**: 필수 (시스템 PATH에 설치)
- **Node.js**: v18 이상 (직접 빌드 시에만)

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

**Version 1.1.0**

A macOS / Windows desktop app for video codec conversion (H.265 → H.264) and HEIC image conversion.

---

## Features

- **Codec Conversion** — Convert H.265 (HEVC) videos to H.264, preserving original resolution and bitrate
- **Resolution Conversion** — Resize to FHD 1080p, QHD 1440p, or UHD (4K) 2160p with bitrate adjustment
- **HEIC Image Conversion** — Convert iPhone/Mac HEIC files to JPEG (100% quality, sRGB IEC61966-2.1 color space)
- **Image Resizing** — Auto-detect portrait/landscape orientation, resize to video-editing dimensions
- **Batch Conversion** — Process multiple files at once with independent video/image batch settings
- **Preview** — Thumbnail and animated preview for files in the list
- **Auto Update Notification** — Checks for new releases automatically on startup

---

## Screenshots

> *(Add screenshots here)*

---

## Installation

### Step 1 — Install FFmpeg (Required)

Sero-Gochim uses [FFmpeg](https://ffmpeg.org/) for video conversion. It must be installed before running the app.

#### macOS

Installation via [Homebrew](https://brew.sh/) is recommended.

```bash
# Install Homebrew (skip if already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install FFmpeg
brew install ffmpeg
```

Verify installation:
```bash
ffmpeg -version
```

#### Windows

1. Download a Windows build from [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html)
2. Extract the archive and add the `bin` folder path (e.g., `C:\ffmpeg\bin`) to the system `PATH` environment variable
3. Verify in Command Prompt:
   ```
   ffmpeg -version
   ```

---

### Step 2 — Install the App

Download the appropriate file from the [Releases page](https://github.com/creatorjosephkr/sero-gochim/releases).

| OS | File | Description |
|---|---|---|
| macOS | `.dmg` | Universal build (Apple Silicon + Intel) |
| Windows | `Setup.exe` | Standard installer wizard |
| Windows | `Portable.exe` | No installation required |

#### macOS

1. Open the `.dmg` file and drag `Sero-Gochim` to the `Applications` folder
2. If you see an "unidentified developer" warning on first launch:
   - Go to **System Settings → Privacy & Security → Open Anyway**
   - Or run in Terminal:
     ```bash
     xattr -cr /Applications/Sero-Gochim.app
     ```

#### Windows

1. Run `Setup.exe`, choose an installation directory, and complete setup
2. Launch from the desktop shortcut or Start Menu

---

## Build from Source

**Requirements**

- [Node.js](https://nodejs.org/) 18 or later
- FFmpeg (see installation instructions above)

**Steps**

```bash
# Clone the repository
git clone https://github.com/creatorjosephkr/sero-gochim.git
cd sero-gochim

# Install dependencies
npm install

# Run in development mode
npm start

# Build macOS DMG
npm run build:mac

# Build Windows EXE (requires Windows environment)
npm run build:win

# Build for both platforms
npm run build:all
```

Build output is placed in the `dist/` folder.

---

## How to Use

1. Click **Add Files** to select video files (MP4, MKV, MOV, AVI, WebM, TS, MTS, M2TS) or images (HEIC, HEIF)
2. Choose a conversion mode for each file:
   - **Video**: Codec conversion (H.264) or Resolution conversion
   - **Image**: Original size, FHD, QHD, or UHD (4K)
3. Set an output folder
4. Click **Convert All**
5. View results in the completion dialog and open the output folder

---

## System Requirements

- **macOS**: 10.13 High Sierra or later
- **Windows**: Windows 10 or later (64-bit)
- **FFmpeg**: Required (must be in system PATH)
- **Node.js**: v18 or later (build only)

---

## License

ISC License

---

## Support Development

If you find this app useful, consider supporting development!

- **KakaoBank** — Scan the QR code via the support button in the app
- **PayPal** — Use the PayPal button in the app's support section
