FROM node:22-bookworm-slim

# alpine linux는 apk 명령어로 사용. debian은 apt-get 사용
# 명령어를 &&을 이용해 한줄로 묶어 레이어를 최적화함 - 용량감소
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# docker 는 dockerfile의 명령어를 한줄마다 하나의 레이어로 만든다.
# 그래서 이전 명령의 결과가 이전과 똑같은지 체크하고 같다면 캐시를 활용한다. 
# package.json이나 package-lock.json이 변경된게없다면 캐시를 활용하여 npm install을 빠르게 정리한다.
COPY package.json package-lock.json* ./
RUN npm install

COPY . .

EXPOSE 3000

# dockerfile은 실행환경만 담당하도록 한다.
# CMD ["npm", "run", "dev"]
