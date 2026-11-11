# 빠른 시작 가이드

## 0️⃣ 전제조건

- **macOS** 또는 **Windows** (64-bit)
- **Node.js** v14 이상
- **ffmpeg** 설치됨

## 1️⃣ Mac에서 시작하기

### 초기 설정 (최초 1회)
```bash
# ffmpeg 설치
brew install ffmpeg

# 프로젝트 폴더로 이동
cd /Users/joseph/Desktop/code/mediaConvert

# 의존성 설치
npm install
```

### 개발 실행
```bash
npm start
```

### 배포 빌드
```bash
# Mac 설치 프로그램 생성 (DMG + ZIP)
npm run build:mac

# 결과 확인
ls -lh dist/
```

## 2️⃣ Windows에서 시작하기

### 초기 설정 (최초 1회)
```powershell
# ffmpeg 설치 (Chocolatey 사용)
choco install ffmpeg

# 프로젝트 폴더로 이동
cd C:\Users\[username]\Desktop\mediaConvert

# 의존성 설치
npm install
```

### 개발 실행
```powershell
npm start
```

### 배포 빌드
```powershell
# Windows 설치 프로그램 생성 (NSIS + 포터블)
npm run build:win

# 결과 확인
dir dist/
```

## 3️⃣ 파일 구조

```
mediaConvert/
├── main.js              ← 메인 프로세스 (크로스 플랫폼)
├── preload.js          ← 보안 프리로드
├── public/
│   ├── index.html      ← UI
│   ├── renderer.js     ← 렌더러 로직
│   └── style.css       ← 스타일
├── package.json        ← 설정 & 빌드 구성
├── dist/               ← 빌드 결과 (자동 생성)
├── node_modules/       ← 의존성 (자동 생성)
└── README.md           ← 프로젝트 설명
```

## 4️⃣ 주요 명령어

| 명령어 | 목적 |
|--------|------|
| `npm start` | 개발 모드 실행 |
| `npm run dev` | 디버그 모드 실행 |
| `npm run build:mac` | Mac 설치 프로그램 생성 |
| `npm run build:win` | Windows 설치 프로그램 생성 |
| `npm run build:all` | Mac + Windows 빌드 (Mac에서만) |

## 5️⃣ 배포 파일

### Mac
```
dist/
├── Media Convert-1.0.0.dmg     # 설치 프로그램
└── Media Convert-1.0.0.zip     # 압축 버전
```

### Windows
```
dist/
├── Media Convert Setup 1.0.0.exe   # 설치 프로그램
└── Media Convert 1.0.0.exe         # 포터블 버전
```

## 🔧 문제 해결

### "ffmpeg not found" 오류
```bash
# Mac에서 확인
which ffmpeg

# Windows에서 확인
where ffmpeg

# 필요시 재설치
brew install ffmpeg        # Mac
choco install ffmpeg       # Windows
```

### 빌드 실패
```bash
# 캐시 제거 및 재설치
rm -rf node_modules dist
npm install
npm run build:mac  # 또는 build:win
```

### 앱이 실행되지 않음
- ffmpeg이 설치되어 있는지 확인
- `npm install`로 의존성 재설치
- macOS 보안 설정 확인 (보안 및 개인정보 보호)

## 📦 배포하기

### Mac 배포 체크리스트
- [ ] `npm run build:mac` 실행
- [ ] `dist/Media Convert-1.0.0.dmg` 생성 확인
- [ ] dmg 파일 테스트 (마운트 & 설치)
- [ ] 사용자에게 dmg 또는 zip 제공

### Windows 배포 체크리스트
- [ ] `npm run build:win` 실행
- [ ] `dist/Media Convert Setup 1.0.0.exe` 생성 확인
- [ ] exe 파일 테스트 설치 및 실행
- [ ] 사용자에게 exe 제공

## 📝 버전 업데이트

버전을 업데이트할 때:
```json
// package.json
{
  "version": "1.0.1"  // 버전 번호 수정
}
```

그 후 다시 빌드하면 새 버전의 설치 프로그램이 생성됩니다.

## 📚 자세한 가이드

더 많은 정보는 [BUILD_GUIDE.md](BUILD_GUIDE.md)를 참조하세요.
