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

- [PNPM](https://pnpm.io/)
- Latest [NodeJS](https://nodejs.org/en) version

## Installation

- Clone this repo
- Run on terminal `pnpm install` to install dependencies
- Create a `.env` file and ask a teammate to share the content
- Run on terminal `pnpm dev` and start rocking

## Available commands

### Run development server

```bash
pnpm dev
```

### Generate production server

```bash
pnpm build
```

### Run a production server

```bash
pnpm start
```

### Run tests

```bash
pnpm test
```

### Run unit tests

```bash
pnpm test:unit
```

### Run watching tests

```bash
pnpm test:watch
```

### Run coverage tests

```bash
pnpm test:coverage
```

### Run cypress

- run it on its own window

```bash
pnpm e2e:watch
```

- these end to end tests can also be open on the terminal directly

```bash
pnpm e2e:run
```

### Run linter on js and ts files

```bash
pnpm lint
```

### Run formatter

```bash
pnpm fmt
```

### Run formatter and linter

```bash
pnpm pretty
```
