# ALGO싶다 - ALgorithm Q&A Community

<div align="center">
<img width="329" alt="image" src="https://user-images.githubusercontent.com/50205887/207568862-cdc9e2c0-b03c-43ff-bf46-3ba79a110d0c.png">

[//]: # ([![Hits]&#40;https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FVoluntain-SKKU%2FVoluntain-2nd&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false&#41;]&#40;https://hits.seeyoufarm.com&#41;)

</div>


> **알고리즘 문제 풀이 꿀팁 공유 및 질문을 위한 커뮤니티** <br/> **개발기간: 2023.04 ~ 2023.06**

## 배포 주소

> [https://algoqna.ddns.net/](https://algoqna.ddns.net) <br>

## 웹개발팀 소개

|                                       김솔민                                        |                                       장윤희                                        |                                       이진희                                        |                                       전오승                                       |                                                                                     
|:--------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------:|  
| <img width="160px" src="https://avatars.githubusercontent.com/u/37677461?v=4" /> | <img width="160px" src="https://avatars.githubusercontent.com/u/87846081?v=4" /> | <img width="160px" src="https://avatars.githubusercontent.com/u/49019236?v=4" /> |                          <img width="160px" src="https://avatars.githubusercontent.com/u/114666481?v=4" />                           | 
|                      [@so1omon](https://github.com/so1omon)                      |                      [@janguni](https://github.com/janguni)                      |                       [@bebusl](https://github.com/bebusl)                       |                  [@jeonoseung](https://github.com/jeonoseung)                   |  
|                                    Backend 개발                                    |                                    Backend 개발                                    |                                   Frontend 개발                                    |                                   Frontend 개발                                   |                                   Backend 개발                                    | 

## 프로젝트 소개

알고리즘 분야에서의 학습과 문제 해결을 돕기 위해 만들어진 간편한 커뮤니티 사이트를 제작했습니다. <br/><br/>
저희의 목표는 프로그래머스, 백준 저지 등 다양한 코딩 테스트 문제를 풀고 이에 대한 질의 응답과 풀이를 공유하는데 있습니다. 
우리는 알고리즘 문제 풀이와 관련된 모든 분야에서 활동하는 개발자들을 위해 특정 온라인 저지 사이트에 관계 없이 유저들의 질문과 고민을 나누고 풀이를 공유할 수 있는 플랫폼을 제공합니다.<br/><br/> 
이 커뮤니티에서는 그래프, 탐색, 정렬, 다이나믹 프로그래밍 등 다양한 알고리즘 분류별로 질문과 꿀팁을 누구나 공유할 수 있습니다. 
우리의 목표는 상호간에 지식을 나누고 향상시킴으로써 개발자들의 알고리즘 역량을 향상시키는 것입니다.<br/><br/>
위와 같은 커뮤니티 서비스를 구현하기 위해 유저들의 의견 공유를 원할히 수행하기 위한 기능 (알람, 댓글 하이라이팅 등)을 제외한 부가적인 기능들 없이 컴팩트한 서비스만을 제공하고 있습니다.



## 시작 가이드
### Requirements
다음 요구사항은 M1 Mac을 기준으로 작성하였습니다. Docker 기반으로 작동하기 때문에 운영체제에 맞게 아래 Requirements를 충족시키시기 바랍니다.
- [Git](https://git-scm.com/downloads)
- [Docker](https://docs.docker.com/desktop/install/mac-install/)

[//]: # (- [Node.js 14.19.3]&#40;https://nodejs.org/ca/blog/release/v14.19.3/&#41;)
[//]: # (- [Npm 9.2.0]&#40;https://www.npmjs.com/package/npm/v/9.2.0&#41;)
[//]: # (- [Strapi 3.6.6]&#40;https://www.npmjs.com/package/strapi/v/3.6.6&#41;)


### Backend

1. 레포지토리 클론
``` bash
$ git clone https://github.com/algorithmQNA/algorithmQNA_backend.git
```

2. application.yml 생성
```bash
##### 공통 properties를 포함한 local 환경과 production 환경을 분리하여 작성하였습니다. #####
##### 또한 properties 정보를 외부에 노출하지 않기 위해 Git action 동작 시 {$secret.PROPERTIES}에 복사하여 사용하였습니다. #####
##### logging 관련 설정값은 적절히 바꿔서 사용하시기 바랍니다. #####
spring:
  profiles:
    active: local
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: {google oauth client id}
            client-secret: {google oauth client secret}
            redirect-uri: {google callback uri}
            authorization-grant-type: authorization_code
            scope:
              - profile
              - email
            client-name: Google
            client-authentication-method: basic

        provider:
          google:
            authorization-uri: https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline
google:
  uri: "https://accounts.google.com/o/oauth2/v2/auth"

cookie:
  domain: {Your domain}

jwt:
  header: Authorization
  accessSecret: {accessSecret}
  refreshSecret: {refreshSecret}

# local properties
---
spring.config.activate.on-profile: local
spring:
  datasource:
    url: {local datasource url}
    username: {mysql username}
    password: {mysql password}
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: create
    properties:
      hibernate:
        default_batch_fetch_size: 1000
        show_sql: true
        format_sql: true
  data:
    redis:
      host: {local redis host}
      port: {local redis port}
      password: {local redis port}

logging:
  level:
    org.hibernate.SQL: debug
    org.hibernate.type: trace
    root: info

cloud:
  aws:
    credentials:
      accessKey: {IAM Access key}
      secretKey: {IAM Secret key}
    s3:
      bucket: {s3 bucket name}
    region:
      static: {s3 bucket region}
    stack:
      auto: false

# production properties
---
spring.config.activate.on-profile: prod
spring:
  datasource:
    url: {local datasource url}
    username: {mysql username}
    password: {mysql password}
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: none
    properties:
      hibernate:
        default_batch_fetch_size: 1000
        show_sql: false
        format_sql: false
  data:
    redis:
      host: {local redis host}
      port: {local redis port}
      password: {local redis port}

logging:
  level:
    root: info

cloud:
  aws:
    credentials:
      accessKey: {IAM Access key}
      secretKey: {IAM Secret key}
    s3:
      bucket: {s3 bucket name}
    region:
      static: {s3 bucket region}
    stack:
      auto: false

decorator:
  datasource:
    p6spy:
      enable-logging: false


```

3. docker-compose.yml 파일 수정 : 도커허브 레포지토리에 있는 이미지 대신 Dockerfile을 통한 이미지 빌드로 전환하기
``` bash
1  version: "3"
2
3  services:
4    myapp:
5        # image: janguni/algorithm-project-docker-repo:1.0)
6        build:
7            context: .
8            dockerfile: Dockerfile
```
4. docker-compose 파일을 통한 이미지 필드
```bash
$ docker-compose build
```
5. 빌드한 이미지 파일로부터 컨테이너 실행 (백그라운드 실행 시 -d 옵션 추가)
```bash
$ docker-compose up
```
### Frontend
**1. 레포지토리 클론**

```
$ git clone https://github.com/algorithmQNA/algorithmQNA_frontend.git
$ cd algorithmQNA_frontend.git

```

**2. 패키지 설치**

```
$ npm i
```

**3. 개발서버 실행**  
환경 변수를 작성해서 최상단 디렉토리에 넣어주세요

3.1. 목서버와 연동하여 실행
```
.env.development.local 작성
REACT_APP_API_BASE_URL={API_PREFIX}
REACT_APP_OAUTH_REDIRECT_URI={YOUR_OAUTH_REDIRECTURI}

npm run dev

```

3.2. 실제서버와 연동하여 실행  
```
.env.production 작성
REACT_APP_API_BASE_URL={API_PREFIX}
REACT_APP_OAUTH_REDIRECT_URI={YOUR_OAUTH_REDIRECTURI}

npm start
```
---

## Stacks 🐈

### Environment

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)
![Docker](https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white)
![Ubuntu](https://img.shields.io/badge/ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)
![msw](https://img.shields.io/badge/msw-ED7344?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTZweCIgaGVpZ2h0PSIyNTZweCIgdmlld0JveD0iMCAwIDI1NiAyNTYiIHZlcnNpb249IjEuMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPgogICAgPHRpdGxlPk1TVzwvdGl0bGU+CiAgICA8Zz4KICAgICAgICA8cGF0aCBkPSJNMzUuMDg3NTM4NSwyOC41NDI5ODI4IEMyMy41MjYwNTYxLDM3LjkzMDY0NDMgMTYuMDE3MzY4Niw1MS41NTA5NzQgMTQuNDE5NTIzMiw2Ni43MDEzMDk5IEwwLDIwMy45NTE4ODUgTDAuMDc1MDkxOTI1NiwyMDYuMzE0MzQyIEwwLjExMjcxMDgwNiwyMDcuMTA4NzM5IEMwLjY1NjUwNDkwNywyMTUuNzQ3NTEyIDQuMzM0MTkxMzksMjIzLjc3ODk1NiAxMC4zMjc3NjYyLDIyOS43ODg5ODkgQzE2Ljg0Njc1NTQsMjM2LjMyNTg2NyAyNS43MTg4Mjk4LDI0MC4wODYzMjIgMzUuMTE3OTA3MywyNDAuMDc4NjUyIEwxNjkuNzQ5NTYzLDIzOS45Njg0NzQgTDE3MS4xNTgwNTcsMjM5Ljk0Nzg4NCBDMTg0Ljg3NjAyOCwyMzkuNDk3MTU5IDE5Ny42MTA0ODIsMjM0LjM0NzY5MyAyMDcuNTE1MjE2LDIyNS4zOTAzNjQgQzIxOC43ODc3MjEsMjE1LjE5NjA5NCAyMjUuMzU2Njg2LDIwMS4wOTQzNyAyMjYuMTM0NzY3LDE4Ni4xODI2NjQgQzIyNi45MTI4NDgsMTcxLjI3MDk1OCAyMjEuODQ3NDcyLDE1Ni41NTY4MzQgMjExLjY5NzY2MiwxNDUuMjM0OTUgTDExMi42MDc5NTUsMzQuNzAyNjEwMSBMMTExLjY1MTA5NSwzMy42NjQzMDM2IEMxMDIuMTQ2NTUxLDIzLjcxOTAyMTcgODkuODIwMzQ4NywxNy42NDk2MDA3IDc2LjU2NjM2NjMsMTYuMjM5NDgyOCBDNjEuNDgyMTA2MywxNC42MzQ2MzgxIDQ2LjY0OTAyMSwxOS4xNTUzMjEyIDM1LjA4NzUzODUsMjguNTQyOTgyOCBaIE03MS4yMjM3ODI2LDY2Ljg5NjQxMTEgQzcyLjU4MTgyNTEsNjcuMDQwODk2IDczLjg0NTEyMzYsNjcuNjYyOTQ0IDc0Ljc4OTg0NDksNjguNjUxMDAxNiBMMTc0LjAwNjcxNiwxNzkuMzIwNjkgQzE3NS4wNjMzMzcsMTgwLjQ5OTMyNyAxNzUuNTY3MTc3LDE4MS45NjI5MDQgMTc1LjQ4NjEwNCwxODMuNTE2NjUzIEMxNzUuNDA1MDMsMTg1LjA3MDQwMiAxNzQuNzUxNjMyLDE4Ni40NzMwNjUgMTczLjU3ODEzNiwxODcuNTM0MzE0IEMxNzIuNTYzMjY3LDE4OC40NTIxMDkgMTcxLjI1ODEyNywxODguOTc5ODcyIDE2OS44OTQ5NTQsMTg5LjAyNDk4OCBMNTIuNTU0MjQyNiwxODkuMTIzMjMzIEw2NC44NTY1OTQ1LDcyLjA1NzA3NzcgQzY1LjAyMTg1ODYsNzAuNDkwMTA3NyA2NS43Njg3Mjg1LDY5LjEzNTMyODQgNjYuOTczMzk1Nyw2OC4xNTcxNjYgQzY4LjE3ODA2MzEsNjcuMTc5MDAzNCA2OS42NTM0NzIyLDY2LjcyOTM0MjYgNzEuMjIzNzgyNiw2Ni44OTY0MTExIFoiIGZpbGw9IiNkYmRiZGIiLz4KICAgICAgICA8cGF0aCBkPSJNMjIwLjczNjM0NSwxLjEzNjg2ODM4ZS0xMyBMMzUuMjA2Mzc4LDAuMTUxODI1NDQxIEwzMy42OTY1MzksMC4xODk2MDk1MDQgTDMyLjg0NjgzOTgsMC4yMzMyODI5OTIgQzI0Ljk5NTY4MTEsMC43Njk1ODQxNjIgMTcuNTQzMzQ0LDMuOTM0MzY3NTEgMTEuNjg2NzczNSw5LjIzMDc0NjYyIEM0LjY3MjgwMDgyLDE1LjU3MzgyMDQgMC41NzUwNDc1NDMsMjQuMzcwNTUyMyAwLjA5MDkzNDI4OTQsMzMuNjQ4NDIyNSBDLTAuMzkzMTc5MTgsNDIuOTI2Mjk2OCAyLjc2NjYzMDE2LDUyLjEwNTA0OTIgOS4wODIwMzk1LDU5LjE0OTc0NjMgTDE3NS4wNjg1MDMsMjQ0LjMwMzkxMiBMMTc2LjEwNTg0MSwyNDUuNDA2NDE5IEwxNzYuNzA2MjI1LDI0Ni4wMTE5MDQgQzE4Mi4zNTIwMjMsMjUxLjUxNzc3OCAxODkuNjc3NDUsMjU0Ljk2ODU0NiAxOTcuNTE0Mzk4LDI1NS44MDIzMzUgQzIwNi45MDAxMTcsMjU2LjgwMDkwMSAyMTYuMTUzMDc4LDI1My45ODA4NzQgMjIzLjM0NjQ4NiwyNDguMTM5OTg5IEMyMzAuNTM5ODkyLDI0Mi4yOTkxMDcgMjM1LjIyMzg1MiwyMzMuODAyNjcyIDIzNi4yMTgwNjMsMjI0LjM3NTgzNyBMMjU2LDM2LjI3NDIyMjcgTDI1NS45MjQ1NzEsMzMuOTAxMTY3MyBMMjU1Ljg4Njk1MiwzMy4xMDY3Njk4IEMyNTUuMzQwOTAxLDI0LjQzMjE0NTUgMjUxLjY0Nzk5NCwxNi4zNjc0NjE4IDI0NS42Mjk0NjYsMTAuMzMyNDA2NSBDMjM5LjA4MzMyOCwzLjc2ODMwNjE1IDIzMC4xNzQ1NjEsLTAuMDA3NzAyNTI5MTIgMjIwLjczNjM0NSwxLjEzNjg2ODM4ZS0xMyBaIE0yMDMuNDUzNDgxLDUwLjk0NzU2MjEgTDE4OS40MzYyNDYsMTg0LjIwNzQ5IEw3MC4wNzczNzA3LDUxLjA1NTgxMDMgTDIwMy40NTM0ODEsNTAuOTQ3NTYyMSBaIiBmaWxsPSIjZmFmYWZhIi8+CiAgICA8L2c+Cjwvc3ZnPg==)

[//]: # (Ubuntu 22.04.2 LTS)

### Config
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![gradle](https://img.shields.io/badge/gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white)

### Development
![Spring](https://img.shields.io/badge/spring-green?logo=spring&style=for-the-badge&logoColor=white)
![SpringSecurity](https://img.shields.io/badge/spring_sequrity-6DB33F?logo=springboot&style=for-the-badge&logoColor=white)
![Mysql](https://img.shields.io/badge/mysql-4479A1?logo=mysql&style=for-the-badge&logoColor=white)
![Typescript](https://img.shields.io/badge/Typescript-3178C6?logo=TypeScript&style=for-the-badge&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&style=for-the-badge&logoColor=white)
![recoil](https://img.shields.io/badge/recoil-3578E5?style=for-the-badge)
![React query](https://img.shields.io/badge/reactquery-FF4154?logo=ReactQuery&style=for-the-badge&logoColor=white)
![tailwind css](https://img.shields.io/badge/tailwindcss-06B6D4?logo=tailwindcss&style=for-the-badge&logoColor=white)
![Amazon EC2](https://img.shields.io/badge/aws-569A31?logo=amazonec2&style=for-the-badge&logoColor=white)
![S3](https://img.shields.io/badge/s3-569A31?logo=amazons3&style=for-the-badge&logoColor=white)
![intellijidea](https://img.shields.io/badge/intellij-000000?logo=intellijidea&style=for-the-badge&logoColor=white)
![nginx](https://img.shields.io/badge/intellij-000000?logo=nginx&style=for-the-badge&logoColor=white)

### Communication
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white)

---
## 화면 구성 📺
| 메인 페이지  |  소개 페이지   |
| :-------------------------------------------: | :------------: |
|  <img width="329" src="https://user-images.githubusercontent.com/50205887/208036155-a57900f7-c68a-470d-923c-ff3c296ea635.png"/> |  <img width="329" src="https://user-images.githubusercontent.com/50205887/208036645-a76cf400-85bc-4fa2-af72-86d2abf61366.png"/>|  
| 강좌 소개 페이지   |  강의 영상 페이지   |  
| <img width="329" src="https://user-images.githubusercontent.com/50205887/208038737-2b32b7d2-25f4-4949-baf5-83b5c02915a3.png"/>   |  <img width="329" src="https://user-images.githubusercontent.com/50205887/208038965-43a6318a-7b05-44bb-97c8-b08b0495fba7.png"/>     |

---
## 주요 기능 📦

### ⭐️ 소셜 로그인을 통한 회원가입
- Google Oauth를 통한 유저 로그인, 간편 회원가입 제공

### ⭐️ 알고리즘 카테고리별 Q&A, TIP 게시판 제공
- 게시글 작성 시 이미지 업로드 등 다양한 형태의 게시글을 작성할 수 있도록 하는 Editor 제공
- 제목, 글쓴이, 키워드로 검색과 댓글 유무, 채택 유무를 통하여 게시글을 필터링하는 기능 제공 

### ⭐️ 신고된 게시글, 공지사항 등을 관리 가능한 관리자 페이지 기능

### ⭐️ 다양한 상황에서 알람 확인 가능
- 내가 쓴 게시글이나 댓글을 좋아요/싫어요 시 알람
- 다른 사람이 내가 쓴 게시글에 댓글을 작성 시, 내가 쓴 댓글에 대댓글을 작성 시 알람
- 관리자가 내 작성글을 삭제 시
- 댓글 또는 게시글 알람의 경우 해당 게시글 페이지로 이동 가능한 링크를 제공
- 댓글 알람의 경우 해당 게시글 페이지에 댓글이 위치한 페이지로 동적 이동 가능한 하이라이팅 기능 제공

---
## 제작 일정 (백앤드)
<img src="https://user-images.githubusercontent.com/37677461/246733314-58eb11c4-479c-4890-bae8-cff66de192b6.png" />

|           제목           |      기간       | 설명                                                                                                                |
|:----------------------:|:-------------:|:------------------------------------------------------------------------------------------------------------------|
|       프로젝트 초기 설계       | 04.23 ~ 05.07 | - ERD와 API 명세 설계 수행                                                                                               |
|   로그인 기능, Entity 설계    | 04.24 ~ 05.05 | - 초기 설계와 독립적인 Oauth 기능 구현<br> - ERD설계와 병렬적으로 Entity Class 구현                                                      |
|     댓글, 게시물 API 개발     | 05.06 ~ 05.13 | - API 설계에 따른 댓글, 게시물 CRUD 기능 구현<br> - 자동 배포를 위한 사전 조사 및 AWS 인스턴스 세팅                                               |
|     관리자, 멤버 API 개발     | 05.14 ~ 05.29 | - API 설계에 따른 관리자, 멤버 API 기능 구현<br> - 글 작성에 따른 멤버 뱃지 상태 변동 기능 추가                                                   |
|   코드 리팩토링 및 인증 방식 변경   | 05.23 ~ 06.04 | - 기존 controller, service 단 소스코드 리팩토링 및 버그 수정 <br> - Oauth에 의존한 인증 방식에서 인증 후 자체적인 jwt를 생상하는 인증 방식으로 변경 후 구현        |
| 알람 API 개발, 알람 생성 로직 추가 | 05.26 ~ 06.01 | - 특정 event 발생 시 각 유저에 해당하는 알람 데이터 생성하는 기능 및 알람 조회/삭제 API 개발 <br> - S3 이미지 서버 연동으로 멤버 프로필 변경기능 및 게시글 이미지 업로드 기능 구현 |
|        자동 배포 설정        | 06.05 ~ 06.08 | - git action을 통한 자동 배포 pipeline 구성 <br> - 프론트 배포구축을 위한 nginx 세팅<br> - host 임대 후 certbot을 이용한 ssl 적용               |
|         최종 테스트         | 06.09 ~ 06.31 | - 테스트코드 작성 및 오류 수정<br> - REAME.md 작성<br> - React 연동 후 단위기능 테스트                                                    |

## 제작 일정(프론트엔드)
![246996272-f83647fe-b8a4-4ddb-a5cd-7f919143111c.png (1590×777)](https://user-images.githubusercontent.com/49019236/246996272-f83647fe-b8a4-4ddb-a5cd-7f919143111c.png)
|           제목           |      기간       | 설명                                                                                                                |
|:----------------------:|:-------------:|:------------------------------------------------------------------------------------------------------------------|
|       프로젝트 초기 설계       | 04.23 ~ 05.07 | - ERD와 API 명세 설계 수행                                                                                               |

## 아키텍쳐

### ERD 설계

<img src="https://user-images.githubusercontent.com/37677461/246724349-6ce065cd-cd40-43ff-a067-4e50dd39b9bf.png" />

### 서버 다이어그램

<img src="https://user-images.githubusercontent.com/37677461/246726962-ac98c418-7b44-4e47-a5e6-08dd13e46048.png" />

- 소셜 로그인 기능을 수행하기 위해서 Spring Security Oauth와 Google Oauth기능을 사용하여 구현했습니다. 로그인 성공 시 스프링에서 자체적으로 JWT 토큰을 provide하여 헤더 정보에 포함시킵니다.</br></br>
- 실제 배포 시 redirectURI에 production 환경 도메인을 설정하기 위해서 no-ip라는 무료 호스팅 사이트로부터 도메인을 발급받고, CA로는 무료 SSL 인증서 발급 기관인 Let's Encrypt를 사용하였습니다.</br></br>
- /api, /oauth 등 API 서버로의 리소스 요청에 해당하는 경우와, 정적 페이지 요청에 해당하는 경우를 분리하여 리버스 프록시를 적용하고자 nginx를 사용했습니다. 이 경우 요청 Origin이 동일하기 때문에 CORS를 적용할 필요가 없습니다.</br></br>
- 프론트단에서 리액트 서버를 따로 구동할 수도 있지만 서버 성능 및 비용을 절감하고자 webpack을 통한 build 파일을 Git action 수행 시 서버에 scp로 업로드하는 방식으로 구현하였습니다. </br></br>
- 메인 branch로 push시 docker를 통해 자동 배포할 수 있게끔 설정하였으며 algorithmQNA_backend/.github/workflows/main.yml을 참고해보세요!


### API Specification

[API 명세 노션 페이지](https://mysterious-drug-b34.notion.site/API-962eb2ef84e44e12ae4be892155f256e)


### 프론트엔드 디렉토리 구조

```bash
.
├── README.md
├── package-lock.json
├── package.json
├── public/
│   ├── ALGOQNA_LOGO.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon-96x96.png
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   ├── mockServiceWorker.js
│   ├── question.png
│   ├── robots.txt
│   └── svg/
│       ├── question.png
│       ├── spinner.png
│       ├── spinner.svg
│       └── tip.png
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── DefaultRouter.tsx
│   ├── apis/
│   │   ├── adminApi.ts
│   │   ├── alarmApi.ts
│   │   ├── authApi.ts
│   │   ├── commentApi.ts
│   │   ├── instance.ts
│   │   └── postApi.ts
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── Badge/
│   │   ├── Board/
│   │   ├── Button/
│   │   ├── Comment/
│   │   ├── DashBoard/
│   │   ├── DropDown/
│   │   ├── ErrorBoundary.jsx
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── Icon/
│   │   ├── Input/
│   │   ├── Loading/
│   │   ├── Login/
│   │   ├── MessageBox/
│   │   ├── Modal/
│   │   ├── MyPage/
│   │   ├── Notice/
│   │   ├── PageTitle/
│   │   ├── Pagination/
│   │   ├── Paper/
│   │   ├── PrivateRoute.tsx
│   │   ├── Report/
│   │   ├── RoundedImage/
│   │   ├── TabNav/
│   │   ├── TableRow/
│   │   ├── Tooltip/
│   │   ├── UserProfile/
│   │   ├── isLoading/
│   │   └── layouts/
│   ├── constants/
│   │   ├── PostCategory.ts
│   │   ├── PostType.ts
│   │   ├── Report.ts
│   │   ├── Role.ts
│   │   └── Sort.ts
│   ├── hooks/
│   │   ├── useCheckAuthority.ts
│   │   ├── useGetMember.ts
│   │   ├── useGetParams.tsx
│   │   ├── useLazyQuery.ts
│   │   └── useModal.ts
│   ├── index.tsx
│   ├── mocks/
│   │   ├── browser.ts
│   │   ├── handlers.ts
│   │   ├── mockAdmin.ts
│   │   ├── mockAuth.ts
│   │   ├── mockComments.ts
│   │   ├── mockPost.ts
│   │   ├── os/
│   │   └── utils/
│   ├── pages/
│   │   ├── Admin/
│   │   ├── Board/
│   │   ├── DashBoard/
│   │   ├── Landing/
│   │   ├── LoginRequest/
│   │   ├── Logout/
│   │   ├── MyPage/
│   │   └── Post/
│   ├── react-app-env.d.ts
│   ├── setupProxy.js
│   ├── storage/
│   │   ├── Dash/
│   │   ├── Highlight/
│   │   ├── Login/
│   │   ├── PageTitle/
│   │   ├── Post/
│   │   └── PostWrite/
│   ├── types/
│   │   ├── Alarm.ts
│   │   ├── Error.ts
│   │   ├── Login.ts
│   │   ├── Post/
│   │   ├── apis/
│   │   ├── category.ts
│   │   ├── comment.ts
│   │   ├── member.ts
│   │   ├── pagination.ts
│   │   ├── post.ts
│   │   ├── report.ts
│   │   ├── typeUtils.ts
│   │   └── user.ts
│   └── utils/
│       ├── TextProcessing.ts
│       └── random.ts
├── tailwind.config.js
├── tree
└── tsconfig.json
```

## 어려웠던 부분, 새로 배웠던 부분, 추후 개선사항
### @이진희 
1. [어려웠던 부분] 댓글 하이라이트 기능 react-query caching
2. [어려웠던 부분] 대댓글 - depth가 깊어질 때 처리
3. [배운부분] react-query 활용법
4. [배운부분] recoil로 공용 모달 사용하기
5. 추후 개선사항 - 리팩토링

### @전오승
1. [어려웠던 부분] 협업
처음 개인 프로젝트를 하고 나서 자신감을 얻어 팀 프로젝트를 참여하게 됐지만 협업이 생각 외로 많이 어려웠습니다.
개인 프로젝트 할 때는 전부 본인이 하기 때문에 따로 정리를 하지 않았지만 팀 프로젝트에서는 다른 사람과 같이 진행하기 위해서 체계적으로 움직여야 하기 때문에 이를 처음 접하는 저에겐 많이 어려운 부분이었습니다.
UI를 디자인하기 위해 사용한 figma, 일정, 기능 정리를 위해 사용한 notion 같은 부분은 사용 자체는 어렵지 않았으나 다른 사람에게 보여줘야 하기 때문에 어떻게 하면 보기 쉽게 표현할까 생각이 많이 필요해서 어려웠던 것 같습니다.

2. [어려웠던 부분] 구글 로그인
아예 처음 해보는 것은 아니었나 구글 로그인 방식에도 여러 방식이 있었고 이를 알기 전에는 단순히 나오는 대로 구현을 했습니다. 구현 후 문제가 됐고 다시 팀에서 정한 방식으로 구현을 했었습니다. 구현을 했고 배포 서버를 통하여 구글 로그인을 시도 했지만 또 문제가 생겼습니다. 프론트에서 혼자 주고 받을 때 문제 없던 코드가 백엔드 배포 서버와 주고 받을 때는 문제가 생겼습니다. 물론 배포 서버에 맞춰 이를 변경했지만 해결하지 못했습니다. 팀원의 도움을 받아 결과적으론 해결했으나 구글 로그인에 대한 부분을 자세히 알아봐야 했기 때문에 많이 어려웠던 것 같습니다.


