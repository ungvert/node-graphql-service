# node-graphql-service

GraphQL API service which uses multiple microservices as data source.

[Assignment](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/graphql-service/assignment.md)

# Requirements

`Node 16.15+, docker, docker compose`

# Installation

1. Clone this repo and install dependencies with `npm i`
2. Install and prepare data source [microservices repo](https://github.com/rolling-scopes-school/node-graphql-service):
   1. Clone and initialise with `git submodule init && git submodule update`
   1. Install dependencies `cd ./microservices && npm i`
   2. Create .env files for connecting Mongo with services
   ```bash 
    for subdir in microservices/*/; do cp $subdir.env.example $subdir.env2; done;
    ```
# Running 
1. Run data source DB and services:
    1. Run Mongo instance with `docker compose up`
    2. Run microservices with `cd microservices/ && npm run run:all:prod`
2. Run GraphQL API with:
    1. Production mode `npm run start` 
    2. Development mode `npm run start:dev` 
