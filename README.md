## 写経
(TypeScriptで実現！Next.js × Expressによるスキーマ自動生成＆環境構築ガイド【Prisma、tsoa、Chakra)[https://zenn.dev/miumi/articles/fa1cc96e54a3c3]


<br/>
<br/>

## 成果物
- フォームだけフロント実装。それだけなのでデプロイしていない。

<br/>
<br/>


## 技術スタック
- バックエンド
  - TypeScript & Node.js
    - typescript: ^5.7.2
    - ts-node: ^10.9.2
    - nodemon: ^3.1.9
  - フレームワーク & ミドルウェア
    - express: ^4.21.2
    - cors: ^2.8.5
  - API仕様管理
    - tsoa: ^6.6.0
    - swagger-typescript-api: ^13.0.23
    - swagger-ui-express: ^5.0.1
  - ORM & データベース
    - prisma: ^6.1.0
    - @prisma/client: ^6.1.0
  - テスト
    - jest: ^29.7.0
    - supertest: ^7.0.0
    - @types/jest: ^29.5.14
    - @types/supertest: ^6.0.2
    - ts-jest: ^29.2.5
  - 開発支援
    - eslint: ^9.13.0
    - @typescript-eslint/eslint-plugin: ^8.18.1
    - @typescript-eslint/parser: ^8.18.1
    - eslint-config-prettier: ^9.1.0
    - eslint-plugin-prettier: ^5.2.1
    - dotenv: ^16.4.7
    - concurrently: ^9.1.0
  - ユーティリティ
    - @faker-js/faker: ^9.3.0
- フロントエンド (Next.js/React/TypeScript)
  - フレームワーク
    - next: 15.1.2
    - react: ^19.0.0
    - react-dom: ^19.0.0
    - next-themes: ^0.4.4
  - UIライブラリ
    - @chakra-ui/react: ^3.2.3
    - react-icons: ^5.4.0
  - フォームバリデーション
    - react-hook-form: ^7.54.2
    - @hookform/resolvers: ^3.9.1
    - zod: ^3.24.1
  - スタイリング
    - @emotion/react: ^11.14.0
    - tailwindcss: ^3.4.1
    - postcss: ^8
  - 開発支援
    - eslint: ^9.17.0
    - eslint-config-next: 15.1.2
    - eslint-config-prettier: ^9.1.0
    - eslint-plugin-import: ^2.31.0
    - eslint-plugin-prettier: ^5.2.1
    - eslint-plugin-react: ^7.37.2
    - prettier: ^3.4.2
  - 型定義
    - @types/node: ^20
    - @types/react: ^19
    - @types/react-dom: ^19
    - typescript: ^5


<br/>
<br/>

## 実行したコマンド（順不同）
- backend
  - npm init
  - npm i express typescript @types/express @types/node ts-node nodemon dotenv
  - npm i @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier
  - npm install 
  - npm run lint
  - npm i prisma @prisma/client
  - npx prisma init
  - npx prisma migrate dev --name init
  - npm i tsoa swagger-ui-express concurrently @types/swagger-ui-express
  - npm i jest supertest ts-jest @faker-js/faker @types/jest @types/supertest
  - npx ts-jest config:init
- fromtend
  - npx create-next-app@latest
  - npm i eslint eslint-plugin-prettier eslint-config-prettier prettier eslint-plugin-import eslint-plugin-react
  - npm i @chakra-ui/react @emotion/react @chakra-ui/cli@3.2.3
  - npx @chakra-ui/cli snippet add
  - npm install react-hook-form zod @hookform/resolvers
  - npm i cors @types/cors swagger-typescript-api
    - backendで実行
  - npm run generate
    - backendで実行
  


<br/>
<br/>

## 学べる点
- tsoaによるAPI仕様書自動生成
- デコレータを使ったルーティング実装
- PrismaによるCRUD処理
- Dockerfile, Docker Compose
- ReactHookFormによるフォーム実装
- Next.jsでのフロントエンド実装
- jestでのテスト実装

<br/>
<br/>

## 使用した外部サービス
- なし

<br/>
<br/>

## 他
- 良記事。かなり本番環境に近い実装らしい。
- [prismaのドキュメント](https://www.prisma.io/docs/orm/prisma-schema/overview/generators)によると、バイナリターゲットを指定しないとDBへの書き込みができない？とのこと。[バイナリターゲットの種類](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#binarytargets-options)
```javascript
generator client {
  provider = "prisma-client-js"
  binaryTargets = ["native", "linux-musl-arm64-openssl-3.0.x"]
  // binaryTargets = ["native"] // prismaがOSから自動で判断してくれるので、2個目の要素はなくてもOK
}
```
- ハイドレーションエラーが解消できておらず。
