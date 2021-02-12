# Miconomy App

[![Codeship Status for mateoolarte/miconomy-app](https://app.codeship.com/projects/859467d1-628d-436d-85f8-ad041ad59623/status?branch=stg)](https://app.codeship.com/projects/425070)

Here you can find the frontend app. Built with NextJS & GraphQL

## Features

- Apollo client: A GraphQL client library
- NextJS: React framework with SSR
- TailwindCSS: Utility first CSS library
- Typescript: Programming language with static typings
- Jest: Test runner
- Git hooks with Husky and Linted staged: To help checking test and formatters before a commit
- Vercel: Deployment platform
- ESLint: Validate the Typescript code style with best practices
- Prettier: Formatter files with configured options

## Prerequisites

- Yarn
- NodeJS LTS version

## Installation

- Clone this repo
- Run on terminal `yarn` to install dependencies
- Create a `.env` file and ask a teammate to share the content
- Run on terminal `yarn dev` and start rocking

## Available commands

### Run development server

```bash
yarn dev
```

### Generate production server

```bash
yarn build
```

### Run a production server

```bash
yarn start
```

### Run tests

```bash
yarn test
```

### Run watching tests

```bash
yarn test:watch
```
