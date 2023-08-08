# Miconomy

Personal finance tracker web app. Built with NextJS & GraphQL

## Features

- Apollo client: A GraphQL client library
- NextJS: React framework with SSR
- Chakra UI: CSS framework to work with styles
- Styled components: CSS in JS library to manage styles (To be depracated)
- Typescript: Programming language with static typings
- Jest: Test runner
- Git hooks with Husky and Linted staged: To help checking test and formatters before a commit
- Vercel: Deployment platform
- ESLint: Validate the Typescript code style with best practices
- Prettier: Formatter files with configured options

## Prerequisites

- [Yarn](https://yarnpkg.com/)
- Latest [NodeJS](https://nodejs.org/en) version

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

### Run unit tests

```bash
yarn test:unit
```

### Run watching tests

```bash
yarn test:watch
```

### Run coverage tests

```bash
yarn test:coverage
```

### Run cypress

- run it on its own window

```bash
yarn e2e:watch
```

- these end to end tests can also be open on the terminal directly

```bash
yarn e2e:run
```

### Run linter on js and ts files

```bash
yarn lint
```

### Run formatter

```bash
yarn fmt
```

### Run formatter and linter

```bash
yarn pretty
```
