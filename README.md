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
|                                    Backend 개발                                    |                                    Backend 개발                                    |                                   Frontend 개발                                    |                                   Frontend 개발                                   |                                                       | 

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
|대시보드|게시판|
|:---:|:---:|
|![로그인대시보드](https://github.com/algorithmQNA/algorithmQNA_frontend/assets/49019236/1f2b10e0-51ea-4c7d-a442-3c19764402c0)|![게시판필터링](https://github.com/algorithmQNA/algorithmQNA_frontend/assets/49019236/31ca9139-de0d-455e-a245-61228e988ed7)|
|전체게시판의 글을 간략하게 볼 수 있는 대시보드입니다. 로그인 후 접근 가능합니다.| 게시판에는 Q&A게시판, 꿀팁게시판이 있습니다. 여러가지 필터링과 정렬 기능을 사용할 수 있습니다.|
|**게시글작성**|**게시글보기**|
|![글작성](https://github.com/algorithmQNA/algorithmQNA_frontend/assets/49019236/82f2deef-2945-4ab2-b840-5f44e03b7e08)|![글보기및채택](https://github.com/algorithmQNA/algorithmQNA_frontend/assets/49019236/f99933f1-7c12-4c83-ae38-abb12d07b5c0)|
|게시글을 작성할 때 이미지, 코드블록을 이용해 구체적인 질문 사항이나 꿀팁을 작성할 수 있습니다. 또한 키워드도 등록이 가능합니다.|이용자들이 작성한 글을 읽고 댓글을 달거나 신고, 채택, 좋아요 표시 등의 기능을 수행할 수 있습니다.|
|**하이라이팅**| --|
| ![하이라이팅](https://github.com/algorithmQNA/algorithmQNA_frontend/assets/49019236/55355601-bb64-4a85-8e08-24265e8b7bfa)| . |
|알람을 받은 댓글이나 채택된 댓글로 바로 이동하고 하이라이팅해줍니다| . |
|**마이페이지**|**관리자페이지(신고)**|
|![마이페이지](https://github.com/algorithmQNA/algorithmQNA_frontend/assets/49019236/be8255de-c396-41c7-bc95-b80d43184e8f)|![신고합](https://github.com/algorithmQNA/algorithmQNA_frontend/assets/49019236/129f0282-f423-46e5-953d-fa0854cad808)|
|마이페이지에서 내 정보 수정, 내 뱃지, 내 활동 내역, 받은 알람등을 확인하고 관리가능합니다.| 관리자 페이지에서 글/댓글에 대한 신고를 관리, 공지사항을 관리할 수 있습니다.|











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
## 제작 일정(프론트엔드)
![246996272-f83647fe-b8a4-4ddb-a5cd-7f919143111c.png (1590×777)](https://user-images.githubusercontent.com/49019236/246996272-f83647fe-b8a4-4ddb-a5cd-7f919143111c.png)


## 문서
### 피그마
![피그마](https://user-images.githubusercontent.com/49019236/246995063-3e7d475c-1031-459e-b2e8-11937e53b84a.png)


### API Specification

[API 명세 노션 페이지](https://mysterious-drug-b34.notion.site/API-962eb2ef84e44e12ae4be892155f256e)




### 디렉토리 구조
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
