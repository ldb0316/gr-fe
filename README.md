# A. 기반환경 세팅가이드

#### 1. 관리자 권한으로 PowerShell 열고 WSL 설치 및 Ubuntu 배포판 자동 설치 후 재부팅
``` PowerShell
# 재부팅하면 Ubuntu 설치 관련 Cmd 창이 자동으로 열릴 수 있으므로 끄지 않도록 주의
# 설치가 자동으로 진행되지않으면 엔터한번눌러보기
wsl --install -d Ubuntu
```
#### 2. 관리자 권한으로 PowerShell 열고 명령어 수행
``` PowerShell
wsl --set-default-version 2
```

#### 3. 정상 설치 확인
``` PowerShell
wsl -l -v

# 아래 결과가 나와야 정상
  NAME      STATE           VERSION
* Ubuntu    Running         2

# Linux용 Windows 하위 시스템 설치된 배포가 없습니다. 라고 뜨면 
# wsl --install -d Ubuntu  다시 수행 후 재부팅
```
> (예외상황) 3-1. Linux용 Windows 하위 시스템 설치된 배포가 없습니다.
``` PowerShell
# 다시 수행 후 재부팅
wsl --install -d Ubuntu
```

> (예외상황) 3-2. VERSION이 1로 나온다면
``` PowerShell
wsl --set-version Ubuntu 2
```

#### 4. wsl Ubuntu 접속 
``` PowerShell
wsl
```

#### 5. Linux(Ubuntu) 초기 설정
``` Bash
sudo apt update && sudo apt upgrade -y
```

#### 6. Docker Desktop 설치 및 WSL2 연결
- https://www.docker.com/products/docker-desktop/ 접속
- docker desktop for AMD64 다운로드 및 설치 
- Docker Desktop 실행 -> 오른쪽 상단 Settings(톱니바퀴) 클릭
- General 탭: ```Use the WSL 2 based engine``` 체크여부 확인
- Resouces 탭 > 상단 WSL Integration 탭:
  ```Enable integration with my default WSL distro``` 체크 후, 아래 ```Ubuntu``` 스위치 ON
- Apply & Restrat 클릭

#### 7. WSL2 내부에 Git 설치 및 workspace세팅
- CMD 켜서 wsl 접속
``` cmd
wsl
```
- git 설치 및 workspace세팅
``` Bash
cd ~

mkdir workspace
cd workspace 

git --version

git config --global user.name "[영문이니셜]"
git config --global user.email "[회사이메일]"
```

#### 8. WSL2 내부에 소스코드 clone
``` Bash
# /home/[영문이니셜]/workspace 경로에서 수행 (과정을 정상적으로 따라했다면 이미 그 경로임)
# /mnt/ 로 시작하는 경로가 아님에 주의해야함!!! 
# /home/[영문이니셜]/workspace 경로는 wsl 전용 내부경로이기 때문에 윈도우 파일시스템의 영향이 없어 I/O속도가 5~10배 빠르다.
git clone 
cd gr-fe
```

#### 9. VSCode에 Extension 설치
* Dev Containers
* WSL

#### 9. VSCode 나 Cursor를 WSL에 연결 및 container 기반 개발환경에 접속 (각 개발자는 9-A 만 수행하세요)
#### 9-A. 접속 가이드
* cmd 열기
* wsl 열기
``` batch
wsl
```
* 프로젝트 workspace 경로로 이동 
``` Bash
cd ~ 
cd workspace/gr-fe/
```
* vscode 실행
``` Bash
code .
````
* VSCode 켜지고 나서 우측 하단에 나오는 팝업에서 Reopen in container 클릭
> 팝업이 안뜬다면 왼쪽 하단 ```><``` 아이콘 누르거나, ```Ctrl + Shift + P``` 눌러서 ```Dev Containers: Reopen in Container``` 직접 선택

#### 9-B. Dev Container 세팅 가이드 (최초세팅 시에만 수행. 각 개발자는 수행하지 않습니다. 세팅가이드를 참조하는 개발자는 이 항목을 무시해주세요)
* 9-A 와 동일하게 접속 후(Reopen in container 만 제외)
* ```Ctrl + Shift + P``` -> ```Dev Containers: Add Dev Container Configuration Files...``` 선택
* ```From 'docker-compose.yml'``` 선택
* 이후 나오는 옵션은 선택하지 말고 전부 OK클릭
* 프로젝트 루트 경로에 생성된 ```.devcontainer``` 내부 docker-compose.yml 삭제
* 프로젝트 루트 경로에 생성된 ```.devcontainer``` 내부 devcontainer.json 내용 수정
``` json
{
  "name": "GR-FE Dev Container",
  "dockerComposeFile": ["../docker-compose.yml"],
  "service": "gr-fe",
  "workspaceFolder": "/app",
  // 컨테이너 접속 시 서버 자동 실행 (npm run restart를 위해 세팅함)
  "postCreateCommand": "git config --global --add safe.directory ${containerWorkspaceFolder} && npm install", // npm install을 dockerfile과 함께 여기에도 두는 이유는, git pull로 인해 package.json이 변경되었을경우 컨테이너 리빌드만 하면 알아서 처리되기때문
  "postStartCommand": "npm run dev",
  "customizations": {
    "vscode": {
      // 해당하는 extension(확장) 을 컨테이너 접속 시에 자동으로 설치해준다
      // 단, attach to running container 를 이용하여 접근할 경우 동작하지 않으므로 주의 필요.
      // 적용되지않을경우 rebuild container 시에 다시 적용해준다
      "extensions": [
        "esbenp.prettier-vscode",
        "Codeium.codeium",
        "dbaeumer.vscode-eslint", // ESLint 지원
        "ms-vscode.vscode-typescript-next" // 핵심: TS/JS 언어 서버
      ],
      // 해당 설정을 VSCode에 자동으로 적용해준다.
      // 단, attach to running container 를 이용하여 접근할 경우 동작하지 않으므로 주의 필요.
      // 적용되지않을경우 rebuild container 시에 다시 적용해준다
      "settings": {
        "git.confirmSync": false,
        "[typescriptreact]": {
          "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "git.autofetch": true,
        "js/ts.updateImportsOnFileMove.enabled": "always",
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true,
        "[javascript]": {
          "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "[typescript]": {
          "editor.defaultFormatter": "esbenp.prettier-vscode"
        }
      }
    }
  }
}
```
* 우측 하단에 나오는 팝업에서 Reopen in container 클릭
> 팝업이 안뜬다면 왼쪽 하단 ```><``` 아이콘 누르거나, ```Ctrl + Shift + P``` 눌러서 ```Dev Containers: Reopen in Container``` 직접 선택


## Q1. 왜 이렇게 하나요?
* 에디터가 WSL2에 직접 연결되어 개발을 하면 I/O성능이 일반 windows 보다 3~5배 이상 빨라진다.
* window의 파일 권한 문제나 대소문자 구분 문제로부터 docker가 자유로워진다
* WSL2 모드에서 도커 기반 개발을 수행하면 ``` 도커 환경 = 개발 환경 = 리눅스 ``` 로 통일되어 배포 서버와 같은 환경에서 개발이 가능하다.
* 윈도우 본체에 Node.js 20, 22 ... 등등 이거저거 지저분하게 설치할 필요가 없다. (윈도우가 고장날일이없다)
* docker 환경기반 개발을 수행하면 ```난 되는데?``` 가 방지됨(환경차이로 인한 버그 발생 원천차단)
* 각 개발자가 어떤 환경에서 개발하든 상관없어진다(윈도우든 맥이든)
* 신규인력 추가 등의 상황에서 세팅이 매우 편해진다 


# B. vs code 개발환경 세팅가이드
#### 1. Extension 설치
* Dev Containers
> 개발환경 구축을 위함
>> Docker Container 환경에 VSCode를 접속시키기 위한 용도
* WSL
> 개발환경 구축을 위함
>> WSL 환경에 VSCode를 접속시키기 위한 용도
* 기타
> Prettier - Code formatter 와 Windsurf Plugin은 컨테이너 접속 시 자동 설치되도록 세팅함 별도 설치 필요 X


# C. 기타 개발 관련 가이드
#### 1. container 로그 확인
* VSCode 좌측 ```Remote Explorer``` 클릭
* ```DEV CONTAINERS``` 항목 안에 있는 ```gr-fe``` 우클릭 -> ```show container log``` 선택

#### 2. 프로젝트에 패키지 추가 필요시(package.json 변동 필요 시)
| 순서 | 작업 내용 | 실행 위치 | 실행 명령어 (예시) | 비고 |
|:---:|:---|:---:|:---|:---|
| **1** | **패키지 설치** | **컨테이너 내부 콘솔<br/>(VSCode에서 Ctrl+`)** | `npm install [패키지명]` | `package.json`과 `lock` 파일이 호스트와 동기화됨 |
| **2** | **동작 확인** | **로그 콘솔 및 브라우저** | - | 로그에서 HMR(재빌드) 확인 and 브라우저에서 원하는 기능 동작확인 |
| **3** | **환경 동기화** | **컨테이너 내부 콘솔<br/>(VSCode에서 Ctrl+`)** | `(Ctrl+C로 종료후) npm run dev` | 자동 반영 안 될 경우 프로세스만 재시작 |
| **4** | **Git push** | **호스트 PC WSL 또는<br/>VSCode Source Control 탭 또는<br/>컨테이너 내부 콘솔<br/>(VSCode에서 Ctrl+`)** | - | **`package.json`,`package-lock.json`** |
| **5** | **이미지 최신화** | **호스트 PC WSL** | `docker compose up -d --build` | 로컬 이미지를 최신 상태로 빌드 |
