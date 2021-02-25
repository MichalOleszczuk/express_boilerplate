# ExpressJS + TypeScript cloud boilerplate

## Description

This is sample NodeJS [(TypeScript)](https://www.typescriptlang.org/) backend service for cloud projects.

<br />

### Microservice covers:

<br />

Logstash integration:

* [Sending logs](src/modules/logger/logger.service.ts)
* Sending metadata (mapped diagnostic context / request execution context)

Metrics:
* [Influx integration](./src/modules/directSendMetrics/direct-send-metrics.service.ts)
* [Metrics collecting](./src/modules/metrics/metrics.service.ts)
* [Auto discovery prometheus format metrics endpoint](./src/apps/core/controllers/metrics.controller.ts)

[Actuator endpoints](./src/apps/core/middlewares/actuator.ts)
* To get info for /actuator/info endpoint [this](scripts/gitRepoInfo.ts) script is executed before build
* HealthCheck included

Swagger / OpenApi:
* [OpenApi](./src/apps/core/middlewares/openApi.ts)
* [Auto endpoint description](./src/apps/core/controllers/metrics.controller.ts)

Error handling:
* On unexppected error return HTTP error

Cache:
* Cache for responses

<br />

## Installation

```bash
npm install
```

## Running the app

| **WARNING:** To run correctly application requires configuration file. Copy [./test/unit/application.yml](./test/unit/application.yml) to git-ignored folder **./congif/app/application.yml** (default path for configuration) or in runtime provide environment variable [EXTERNAL_CONFIG_FILES](./src/modules/config/utils/load-configs.ts) |
| --- |

<br />

## Terminal commands

```bash
# production mode
npm run start

# watch mode
npm run start:dev

# build production build
npm run build

# run unit tests
npm run test

# run e2e tests
npm run test:e2e

# run contract tests
npm run test:contract
```

### Debugger in Visual Studio Code
You can find vscode configuration file [there](./.vscode/launch.json)
Just press **F5** in your workspace.

<br />

## Configuration
<br />

Configuration file [application.yml](./test/unit/application.yml), can be splited to as many sections as you want. Best practice is to load it only once in the application.

There is [ConfigsLoader](./src/modules/config/utils/load-configs.ts) that can be used as module that loads the file.
Each part of [application.yml](./test/unit/application.yml) should be [registered](configs/server.config.ts) with [ConfigurationService](src/modules/config/config.service.ts) then it should be [accessed](./src/main.ts) like that:
```js
const { port } = ConfigService.get<typeof serverConfiguration>('serverConfiguration');
```

<br />

## App initialization
<br />

As you can see application has asynchronus initialization part [await init()](./src/init/index.ts)used in [main.ts](./src/main.ts). It serves as asynchronus point to load all modules required in your application runtime like [Database connection.](./src/init/dbConnection.ts)

<br />

## How to develop
<br />

Just copy [helloWorld](./src/apps/helloWorld) example. Create your own "helloWorld" folder and follow the project structure. When this repo will be upgraded you will be able to just pull changes. For one of your [apps](./src/apps) to work remember to connect it to [main router.](./src/routes/router.ts) To connect your middlewares add it to [middlewares array.](./src/apps/app.ts) Remember that order in array metters!

<br />

## Testing database
<br />

There is implemented sqlite example with sample [migration](src/resources/db/migrations/1608163413451-Init.ts).

By default you should use [ormconfig.ts](./ormconfig.ts).

[/users](http://localhost:8080/users) endpoint by default will return empty array but if you will connect sqlite example it will return 100 fake users.

How to do it?

```bash
# run migrations / create database
npm run typeorm migration:run

# seed database
npm run seed
```

<br />

Happy coding!
