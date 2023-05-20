# Miconomy

Personal finance tracker web app. Built with NextJS, GraphQL & Prisma ORM

## Features

- Prisma: Next generation of ORM to work with DB
- Postgres: Database provider
- Nexus: Code-first library to generate schema for GraphQL servers
- Apollo client: A GraphQL client library
- NextJS: React framework with SSR
- Styled components: CSS in JS library to manage styles
- Typescript: Programming language with static typings
- Jest: Test runner
- Git hooks with Husky and Linted staged: To help checking test and formatters before a commit
- Vercel: Deployment platform
- ESLint: Validate the Typescript code style with best practices
- Prettier: Formatter files with configured options

## Used libraries

- Bcrypt: Password hashing
- JWT: JWT token

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

### Run a GUI app to manage database models

```bash
pnpm studio
```

### Sync migrations for development server

```bash
pnpm migrate:dev
```

**Note:** You should ensure to have the right credentials for the database on `.env` file.

### Create migrations for development server

```bash
pnpm migrate:dev --name NAME_OF_MIGRATION
```

**Note:** You should ensure to have the right credentials for the database on `.env` file.

### Sync migrations for production server

In this case, before run this command we should un/comment on the `.env` the right DB provider env

```bash
pnpm migrate
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
