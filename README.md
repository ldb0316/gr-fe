<details>
<summary>1. Docker 및 WSL 세팅</summary>

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

#### 7. docker network 추가
``` bash
docker network create private-network
```
</details>

<details>
<summary>2. 프론트 개발환경을 위한 추가 WSL 세팅</summary>

#### 1. WSL2 내부에 Git 및 workspace세팅
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

#### 2. WSL2 내부에 소스코드 clone
``` Bash
# /home/[영문이니셜]/workspace 경로에서 수행 (과정을 정상적으로 따라했다면 이미 그 경로임)
# /mnt/ 로 시작하는 경로가 아님에 주의해야함!!! 
# /home/[영문이니셜]/workspace 경로는 wsl 전용 내부경로이기 때문에 윈도우 파일시스템의 영향이 없어 I/O속도가 5~10배 빠르다.
git clone https://github.com/ldb0316/my-fe.git
cd my-fe
```
</details>
<details>
<summary>3. VSCode 기본세팅</summary>

#### 1. VSCode에 Extension 설치
* Dev Containers
* WSL
</details>

<details>
<summary>4. 개발환경 접속</summary>

#### 1. VSCode 나 Cursor를 WSL에 연결 및 container 기반 개발환경에 접속
* cmd 열기
* wsl 열기
``` batch
wsl
```
* 프로젝트 workspace 경로로 이동 
``` Bash
cd ~ 
cd workspace/my-fe/
```
* vscode 실행
``` Bash
code .
````
* VSCode 켜지고 나서 우측 하단에 나오는 팝업에서 Reopen in container 클릭
> 팝업이 안뜬다면 왼쪽 하단 ```><``` 아이콘 누르거나, ```Ctrl + Shift + P``` 눌러서 ```Dev Containers: Reopen in Container``` 직접 선택
</details>


<details>
  <summary>5. 기타 개발 관련 가이드</summary>

  #### 1. container 로그 확인
* VSCode 좌측 ```Remote Explorer``` 클릭
* ```DEV CONTAINERS``` 항목 안에 있는 ```my-fe``` 우클릭 -> ```show container log``` 선택

#### 2. 프로젝트에 패키지 추가 필요시(package.json 변동 필요 시)
| 순서 | 작업 내용 | 실행 위치 | 실행 명령어 (예시) | 비고 |
|:---:|:---|:---:|:---|:---|
| **1** | **패키지 설치** | **컨테이너 내부 콘솔<br/>(VSCode에서 Ctrl+`)** | `npm install [패키지명]` | `package.json`과 `lock` 파일이 호스트와 동기화됨 |
| **2** | **동작 확인** | **로그 콘솔 및 브라우저** | - | 로그에서 HMR(재빌드) 확인 and 브라우저에서 원하는 기능 동작확인 |
| **3** | **환경 동기화** | **컨테이너 내부 콘솔<br/>(VSCode에서 Ctrl+`)** | `(Ctrl+C로 종료후) npm run dev` | 자동 반영 안 될 경우 프로세스만 재시작 |
| **4** | **Git push** | **호스트 PC WSL 또는<br/>VSCode Source Control 탭 또는<br/>컨테이너 내부 콘솔<br/>(VSCode에서 Ctrl+`)** | - | **`package.json`,`package-lock.json`** |
| **5** | **이미지 최신화** | **호스트 PC WSL** | `docker compose up -d --build` | 로컬 이미지를 최신 상태로 빌드 |
</details>

