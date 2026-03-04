# 세팅가이드

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
git clone 
cd gr-fe
```

#### 9. VSCode 나 Cursor를 WSL에 연결 및 container 기반 개발환경에 접속 (각 개발자는 9-A 만 수행하세요)
#### 9-A. 접속 가이드
* VSCode 실행
* 좌측 하단 ```><``` 아이콘 클릭
* Connect to WSL 선택 (안될경우 WSL Extension 설치 후 재시도)
* Dev Containsers Extension 설치
> 설치 후 Extension목록에서 local-installed 쪽에 설치될건데, ```install in WSL: Ubuntu``` 버튼이 보인다면 반드시 눌러주어야함
* Container Tools Extension 설치
* Explorer 탭으로 넘어와서 Open Folder 선택
* 프로젝트 경로 선택 후 OK 버튼 클릭 ```예시 : /home/lee/workspace/gr-fe```
* ```Ctrl + ~ ``` 눌러서 커맨드 창 열고 ```docker compose up -d```
* docker 컨테이너 실행이 완료되면 우측 하단에 나오는 팝업에서 Reopen in container 클릭
> 팝업이 안뜬다면 왼쪽 하단 ```><``` 아이콘 누르거나, ```Ctrl + Shift + P``` 눌러서 ```Dev Containers: Reopen in Container``` 직접 선택

#### 9-B. Dev Container 세팅 가이드 (최초세팅 시에만 수행. 각 개발자는 수행하지 않습니다. 세팅가이드를 참조하는 개발자는 이 항목을 무시해주세요)
* 좌측 하단 ```><``` 아이콘 클릭
* Connect to WSL 선택 (안될경우 WSL Extension 설치 후 재시도)
* Dev Containsers Extension 설치
> 설치 후 Extension목록에서 local-installed 쪽에 설치될건데, ```install in WSL: Ubuntu``` 버튼이 보인다면 반드시 눌러주어야함
* Container Tools Extension 설치
* Explorer 탭으로 넘어와서 Open Folder 선택
* 프로젝트 경로 선택 후 OK 버튼 클릭 ```예시 : /home/lee/workspace/gr-fe```
* ```Ctrl + ~ ``` 눌러서 커맨드 창 열고 ```docker compose up -d```
* ```Ctrl + Shift + P``` -> ```Dev Containers: Add Dev Container Configuration Files...``` 선택
* ```From 'docker-compose.yml'``` 선택
* 이후 나오는 옵션은 선택하지 말고 전부 OK클릭
* 프로젝트 루트 경로에 생성된 ```.devcontainer``` 내부 docker-compose.yml 삭제
* 프로젝트 루트 경로에 생성된 ```.devcontainer``` 내부 devcontainer.json 내용 수정
``` json
{
	"name": "GR-FE Dev Container",
	"dockerComposeFile": [
		"../docker-compose.yml"
	],
	"service": "gr-fe",
	"workspaceFolder": "/app"
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
``` Bash
# 위 과정 수행 후 
1. git clone 
2. docker-compose up -d 
3. 끝
```


# vs code 개발환경 세팅가이드
#### 1. Extension 설치
* Dev Containers
> 개발환경 구축을 위함
>> Docker Container 환경에 VSCode를 접속시키기 위한 용도
* WSL
> 개발환경 구축을 위함
>> WSL 환경에 VSCode를 접속시키기 위한 용도
* Prettier - Code formatter (필수)
> ```Ctrl + Shift + P``` -> ```Format Document With...``` -> ```Prettier - Code formatter``` 선택
>> ```Ctrl + ,``` -> 검색창에 ```format on save``` 검색 -> ```Editor: Format On Save``` 체크
* Windsurf Plugin (옵션)
> Windsurf Plugin은 ai기반 코드 자동완성 기능 사용을 위한 확장임
