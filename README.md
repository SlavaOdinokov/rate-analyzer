## Installation

```bash
$ cp .env.example .env
$ yarn install
$ yarn build
$ docker-compose -f docker-compose.db.yml up -d
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Running the rate analyzer script

```bash
$ yarn cli analyzer
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
