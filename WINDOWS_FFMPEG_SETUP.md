# Windows ffmpeg 설치 가이드

## 문제

Windows에서 앱을 실행할 때 다음과 같은 오류가 나타나는 경우:

```
Error: spawn ffprobe ENOENT
```

이는 **ffmpeg과 ffprobe를 찾을 수 없다**는 의미입니다.

---

## 해결 방법

### 방법 1: Chocolatey 사용 ⭐ (가장 간단)

#### 단계 1: PowerShell 관리자 권한으로 실행
- Windows 시작 메뉴에서 `PowerShell` 검색
- **마우스 우클릭** > `관리자 권한으로 실행`

#### 단계 2: ffmpeg 설치
```powershell
choco install ffmpeg
```

#### 단계 3: PowerShell 재시작
- PowerShell 종료
- 새 PowerShell 창 열기

#### 단계 4: 앱 실행
```powershell
cd C:\Users\[username]\Desktop\mediaConvert
npm start
```

---

### 방법 2: 수동 설치

#### 단계 1: ffmpeg 다운로드
1. [ffmpeg 공식 사이트](https://ffmpeg.org/download.html) 방문
2. **Windows Builds** 섹션에서 다운로드
   - `ffmpeg-git-full.7z` 또는 `ffmpeg-git-essentials.7z` 추천

#### 단계 2: 압축 해제
1. 7-Zip 또는 WinRAR로 압축 해제
2. 원하는 경로에 저장
   - 예: `C:\ffmpeg` 또는 `C:\Program Files\ffmpeg`

#### 단계 3: PATH 환경 변수 등록

**방법 A: GUI로 등록**

1. 바탕화면의 **내 PC** 우클릭
2. **속성** 선택
3. 좌측에서 **고급 시스템 설정** 클릭
4. **환경 변수** 버튼 클릭
5. **시스템 변수** 섹션에서 `Path` 선택
6. **편집** 클릭
7. **새로 만들기** 클릭
8. ffmpeg 설치 경로의 bin 폴더 입력
   - 예: `C:\ffmpeg\bin` 또는 `C:\Program Files\ffmpeg\bin`
9. **확인** 클릭 (모든 창)

**방법 B: PowerShell로 등록**

관리자 권한 PowerShell에서:
```powershell
# ffmpeg 설치 경로에 맞게 수정하세요
$ffmpegPath = "C:\ffmpeg\bin"
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";$ffmpegPath", "Machine")
```

#### 단계 4: PC 재부팅
- 환경 변수 변경사항 적용을 위해 재부팅 필요

---

## 설치 확인

PowerShell에서 다음 명령어 실행:

```powershell
ffmpeg -version
ffprobe -version
```

다음과 같이 버전 정보가 나타나면 설치 성공:

```
ffmpeg version ...
```

### 경로 확인

```powershell
where ffmpeg
where ffprobe
```

설치 경로가 출력되면 정상입니다. ✅

---

## 앱 실행

ffmpeg 설치 후:

1. **PowerShell 재시작** (중요!)
2. 프로젝트 폴더로 이동
   ```powershell
   cd C:\Users\[username]\Desktop\mediaConvert
   ```
3. 앱 실행
   ```powershell
   npm start
   ```

이제 정상적으로 작동할 것입니다! 🎉

---

## 문제 해결

### "ffmpeg command not found" 오류
- PowerShell이 여전히 재시작되지 않았을 수 있음
- PowerShell을 완전히 종료했다 다시 열기
- 또는 Command Prompt (cmd.exe) 시도

### 설치 후에도 안 될 때
1. 환경 변수가 올바른지 확인
   ```powershell
   $env:Path
   ```
2. ffmpeg이 설치된 경로 확인
3. 해당 경로가 환경 변수에 포함되어 있는지 확인

### Chocolatey가 없는 경우
- [Chocolatey 설치](https://chocolatey.org/install)
- 또는 방법 2 (수동 설치) 사용

---

## 추가 정보

- **Chocolatey**: Windows 패키지 관리자
  - 설치: https://chocolatey.org/install
  - 앞으로도 다양한 소프트웨어를 쉽게 설치 가능

- **ffmpeg**: 오디오/비디오 변환 도구
  - 공식 사이트: https://ffmpeg.org/
  - 여러 미디어 형식 지원

---

## Windows vs macOS 차이

| 항목 | macOS | Windows |
|------|-------|---------|
| ffmpeg 설치 | `brew install ffmpeg` | `choco install ffmpeg` 또는 수동 |
| 경로 설정 | 자동 | 수동 (PATH 등록 필요) |
| 재시작 | 불필요 | 필요 (PowerShell 재시작) |

---

문제가 계속되면 ffmpeg 설치 경로와 환경 변수 설정을 다시 확인해주세요.
