## Running the app

```bash

# install modules
$ yarn install

# postgres docker
$ docker-compose up

# make database
$ npm prisma generate

# fist migration
$ npx prisma migrate dev --name 20230127161949_init --schema src/core/prisma/schema.prisma

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```



## Execute seeds

you must run executedSeed mutation

Playground example:

mutation {
  executedSeed
}
