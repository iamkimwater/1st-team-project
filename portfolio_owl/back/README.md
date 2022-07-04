# 포트폴리오 공유 서비스 백엔드 코드

## 실행 방법

## 1. Mongodb 서버 구축 (a, b 중 선택)

### a. 로컬 서버

아래 공식 문서 참조 \
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/ \
`mongosh` 커맨드로 서버가 들어가지면 성공적으로 구축된 것입니다. \

### b. Atlas 서버

아래 링크 가입 -> 무료 클러스터 생성 (512MB) \
https://www.mongodb.com/atlas \
왼쪽 아래 SECURITY 의 Database Access -> Add New User -> name, password 설정 \
왼쪽 아래 SECURITY 의 Network Access -> Add IP Address -> current IP 등록 \
왼쪽 위 DEPLOYMENT Databases -> Connect -> Connect your application -> 서버 링크 복사

> Atlas 관련 상세 매뉴얼은 프로젝트 안내페이지의 "알면 좋을 개발 Tip"에 있습니다.

## 2. Mongodb 서버 url 환경변수에 등록

./.env 파일 수정 \
MONGODB_URL을 위에서 만든 mongodb 서버 링크로 설정

```bash
MONGODB_URL="mongodb://localhost:27017/myDB"  (로컬 서버의 경우 예시)
MONGODB_URL="mongodb+srv://<name>:<password>@cluster0.acaph.mongodb.net/myDB?retryWrites=true&w=majority" (Atlas 서버의 경우 예시)
```

> Atlas 서버의 경우 <name>, <password>를 위에서 설정했던 name, password로 바꾸어 주세요.

## 3. Express 실행

> yarn은 사실 npm 패키지입니다. yarn부터 설치합니다. (이미 설치 시 생략)

> 이후, 아래 yarn 커맨드는, yarn install 커맨드의 단축키입니다. 즉, 라이브러리 설치 커맨드입니다.

> yarn 입력 시 자동으로, package.json 바탕으로 라이브러리를 한꺼번에 설치해 줍니다.

```bash
npm install --global yarn
yarn
yarn start
```

<hr />

## 파일 구조 설명

1. src폴더는 크게는 **routers, services, db**의 3개 폴더로 구분됩니다.

- routers:
  - request와 response가 처리됩니다. MVP 별로 1개씩, 총 5개 파일이 있게 됩니다.
  - 현재는 User MVP 파일만 있습니다.
- services:
  - 백엔드 로직 코드가 있습니다. MVP 별로 1개씩, 총 6개 파일이 있게 됩니다.
- db:
  - Mongoose와 mongodb 서버를 연결하는 코드가 있는 index.js
  - Mongoose 스키마가 있는 schemas 폴더,
    - MVP 별로 6개 파일이 있습니다.
  - Mongoose 모델 ORM 코드가 있는 models 폴더
    - MVP 별로 6개 파일이 있습니다.

2. 이외 폴더는 아래와 같습니다.

- src/middlewares:
  - jwt토큰을 다루는 미들웨어인 login_required.js
  - 학습 편의를 위해 일괄 http 400 코드로 에러를 변환하는 에러핸들러인 errorMiddleware.js

3. 6개의 MVP는 아래와 같습니다.

- **Award**: 사용자의 수상내역, 수상일자를 저장합니다.
- **Certificate**: 사용자의 자격증, 자격증 발급날짜를 저장합니다.
- **Education**: 사용자의 학력에 관하여 학교이름, 전공, 상태를 저장합니다.
- **Project**: 사용자가 수행했던 프로젝트의 내역과 프로젝트 기간을 저장합니다.
- **Programming Language**: 사용자가 사용하는 프로그래밍 언어와 숙련도를 저장합니다.

4. 전체적인 로직은 아래와 같습니다. (예를 들어 Award MVP기준입니다.)

- router -> service -> db/model -> db/schema 이런 흐름으로 Award의 데이터가 업데이트 됩니다.
- **Award 입력 시**, 
  - create Router에서 요청된 데이터를 Award db에 추가합니다.
  - AwardService에서 만들어진 함수를 호출하여 schema에 구성된 데이터 형식으로 Award 정보가 저장됩니다.
- **입력했던 AwardList가 화면에 보여지게 됩니다.**
  - 사용자의 아이디(user_id)로 입력되었던 awards를 요청하여 award list로 보여지게 됩니다.
- **Award 수정 시**, 
  - 입력되었던 Award 객체마다 주어진 고유의 아이디로 선택한 Award 객체를 불러와 수정됩니다.
- **Award 삭제 시**,
  - 사용자의 삭제여부를 한 번 더 확인 후, Award 객체의 아이디를 찾아 삭제하게 됩니다.
  - 삭제 후 삭제된 상태를 return 하고 삭제된 Award를 제외한 award list가 호출되게 됩니다.
