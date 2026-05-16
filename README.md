# 세로 고침 (Sero-Gochim)

**버전 1.1.2**

영상 코덱 변환(H.265 → H.264)과 HEIC 이미지 변환을 위한 macOS / Windows 데스크탑 앱입니다.  
FFmpeg/FFprobe가 앱 안에 내장되어 있어 별도 설치가 필요 없습니다.

> [English version below ↓](#sero-gochim-english)

---

## 주요 기능

- **코덱 변환** — H.265(HEVC) 영상을 H.264로 변환. 원본 해상도·비트레이트 유지
- **해상도 변환** — FHD 1080p / QHD 1440p / UHD(4K) 2160p 리사이즈 + 비트레이트 조정
- **HEIC 이미지 변환** — iPhone·Mac HEIC 파일을 JPEG(100% 품질, sRGB IEC61966-2.1 색상 공간)으로 변환
- **이미지 리사이즈** — 가로/세로 자동 인식 후 영상 편집용 크기(FHD / QHD / UHD) 변환
- **일괄 변환** — 여러 파일 한 번에 처리. 영상/이미지 일괄 설정 독립 지원
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
| macOS | `Sero-Gochim-v1.1.2-Universal.dmg` | Apple Silicon / Intel 통합(Universal) 빌드 |
| Windows | `Sero-Gochim-v1.1.2-Setup.exe` | 설치 마법사 방식 |
| Windows | `Sero-Gochim-v1.1.2-Portable.exe` | 설치 없이 바로 실행 |

### macOS 설치

1. `Sero-Gochim-v1.1.2-Universal.dmg` 파일을 열고 `Sero-Gochim`을 `Applications` 폴더로 드래그
2. 처음 실행 시 "확인되지 않은 개발자" 경고가 뜨면:
   - **시스템 설정 → 개인 정보 보호 및 보안 → "확인 없이 열기"** 클릭
   - 또는 터미널에서 실행:
     ```bash
     xattr -cr /Applications/Sero-Gochim.app
     ```

### Windows 설치

1. `Sero-Gochim-v1.1.2-Setup.exe`를 실행하고 설치 경로 선택 후 완료
2. 바탕화면 또는 시작 메뉴 바로가기로 실행

---

## 사용 방법

1. **파일 선택** 버튼 또는 드래그 앤 드롭으로 영상(MP4, MKV, MOV, AVI, WebM, TS, MTS, M2TS) 또는 이미지(HEIC, HEIF) 추가
2. 각 파일의 변환 모드 선택:
   - **영상**: 코덱 변환(H.264) 또는 해상도 변환
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

**Version 1.1.2**

A macOS / Windows desktop app for video codec conversion (H.265 → H.264) and HEIC image conversion.  
FFmpeg/FFprobe are bundled inside the app — no separate installation required.

---

## Features

- **Codec Conversion** — Convert H.265 (HEVC) videos to H.264, preserving original resolution and bitrate
- **Resolution Conversion** — Resize to FHD 1080p, QHD 1440p, or UHD (4K) 2160p with bitrate adjustment
- **HEIC Image Conversion** — Convert iPhone/Mac HEIC files to JPEG (100% quality, sRGB IEC61966-2.1 color space)
- **Image Resizing** — Auto-detect portrait/landscape orientation, resize to video-editing dimensions
- **Batch Conversion** — Process multiple files at once with independent video/image batch settings
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
| macOS | `Sero-Gochim-v1.1.2-Universal.dmg` | Universal build (Apple Silicon + Intel) |
| Windows | `Sero-Gochim-v1.1.2-Setup.exe` | Standard installer wizard |
| Windows | `Sero-Gochim-v1.1.2-Portable.exe` | No installation required |

### macOS

1. Open the `Sero-Gochim-v1.1.2-Universal.dmg` file and drag `Sero-Gochim` to the `Applications` folder
2. If you see an "unidentified developer" warning on first launch:
   - Go to **System Settings → Privacy & Security → Open Anyway**
   - Or run in Terminal:
     ```bash
     xattr -cr /Applications/Sero-Gochim.app
     ```

### Windows

1. Run `Sero-Gochim-v1.1.2-Setup.exe`, choose an installation directory, and complete setup
2. Launch from the desktop shortcut or Start Menu

---

## How to Use

1. Click **Select Files** or drag and drop video files (MP4, MKV, MOV, AVI, WebM, TS, MTS, M2TS) or images (HEIC, HEIF)
2. Choose a conversion mode for each file:
   - **Video**: Codec conversion (H.264) or Resolution conversion
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

## License

ISC License

---

## Support Development

If you find this app useful, consider supporting development!

- **KakaoBank** — Scan the QR code via the support button in the app
- **PayPal** — Use the PayPal button in the app's support section
