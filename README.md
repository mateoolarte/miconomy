# Miconomy Web

Here you can find the web app. Built with NextJS & GraphQL

## Features

- Apollo client: A GraphQL client library
- NextJS: React framework with SSR
- Styled components: CSS in JS library to manage styles
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

### Run cypress

- run it on its own window

```bash
yarn cypress:open
```

- these end to end tests can also be openes on the terminal directly

```
yarn cypress:run
```
