# Media Convert - 빌드 가이드

이 가이드는 Mac과 Windows 모두에서 Media Convert 앱을 빌드하고 실행하는 방법을 설명합니다.

## 필수 요구사항

### 모든 플랫폼
- Node.js (v14 이상)
- npm 또는 yarn

### Mac에서 Windows 빌드를 위한 추가 요구사항
- Wine (Windows 앱 빌드용)
- Windows 빌드가 필요한 경우만 설치: `brew install wine`

### 필수 외부 도구
- **ffmpeg**: 비디오 변환 및 프로빙용
- **ffprobe**: 메타데이터 추출용

#### Mac에서 설치
```bash
brew install ffmpeg
```

#### Windows에서 설치
1. https://ffmpeg.org/download.html 에서 다운로드
2. 또는 Chocolatey 사용: `choco install ffmpeg`

## 개발 환경 설정

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 모드 실행
```bash
npm start
# 또는 디버그 모드
npm run dev
```

## 빌드 방법

### Mac에서 빌드

#### DMG + ZIP 패키지 생성
```bash
npm run build:mac
```

생성된 파일:
- `dist/Media Convert-1.0.0.dmg` - 설치 프로그램
- `dist/Media Convert-1.0.0.zip` - 압축 버전

#### 설치 및 실행
1. DMG 파일을 더블클릭하여 열기
2. Media Convert 앱을 Applications 폴더로 드래그
3. Applications에서 앱 실행

### Windows에서 빌드

#### NSIS 설치 프로그램 + 포터블 버전 생성
```bash
npm run build:win
```

생성된 파일:
- `dist/Media Convert Setup 1.0.0.exe` - 설치 프로그램
- `dist/Media Convert 1.0.0.exe` - 포터블 버전

#### 설치 및 실행
1. Setup EXE를 실행하여 설치
2. 바탕화면의 바로가기 또는 시작 메뉴에서 앱 실행
3. 또는 포터블 EXE를 직접 실행

### 모든 플랫폼 빌드 (Mac에서만 가능)

```bash
npm run build:all
```

이 명령어는 Mac DMG와 Windows NSIS 설치 프로그램을 모두 생성합니다.

## 출력 파일

모든 빌드 결과는 `dist/` 디렉토리에 저장됩니다.

## ffmpeg/ffprobe 경로 설정

앱은 시스템 PATH에서 `ffmpeg`과 `ffprobe`를 자동으로 찾습니다.

만약 시스템에 설치되지 않았거나 찾을 수 없는 경우:

### Mac
```bash
which ffmpeg
which ffprobe
```

### Windows
```cmd
where ffmpeg
where ffprobe
```

## 문제 해결

### ffmpeg 실행 오류
- **증상**: "ffmpeg not found" 또는 "command not found"
- **해결**: ffmpeg과 ffprobe가 시스템 PATH에 있는지 확인

### Windows에서 빌드 실패
- NSIS 설치 프로그램 빌드에 NSIS 도구가 필요할 수 있습니다
- 간단한 포터블 버전만 필요한 경우: 따로 구성 필요

### Mac DMG 설치 오류
- 보안 설정 확인: 시스템 설정 > 보안 및 개인정보 보호
- 필요시 앱 열기 허용

## 개발 팁

### 프로세스 자동 종료
앱은 시작 시 자동으로 기존 ffmpeg 프로세스를 종료합니다.

### 핫 리로드
개발 중 파일 변경:
1. 렌더러 프로세스 (public/* 파일): 브라우저 새로고침
2. 메인 프로세스 (main.js): 앱 재시작 필요

### 디버그 정보
`npm run dev`로 실행하면 추가 로깅 정보를 얻을 수 있습니다.

## 앱 버전 업데이트

버전을 업데이트할 때:
1. `package.json`의 `version` 값 수정
2. 다시 빌드: `npm run build`

## 라이선스

ISC

## 지원
문제가 발생하면 ffmpeg이 올바르게 설치되어 있는지 먼저 확인하세요.
