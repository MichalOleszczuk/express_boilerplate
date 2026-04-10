# Express.js Cloud Boilerplate

Production-ready ExpressJS + TypeScript boilerplate for cloud microservices.

## Features

- **Logging** — Logstash integration with MDC (Mapped Diagnostic Context)
- **Metrics** — InfluxDB integration + Prometheus auto-discovery endpoint
- **Actuator** — Health check + /actuator/info endpoint
- **API Docs** — Swagger / OpenAPI with auto endpoint description
- **Error handling** — Global HTTP error handling
- **Caching** — Response cache out of the box
- **Config** — YAML-based configuration with ConfigurationService
- **Testing** — Unit, E2E and contract tests included

## Tech

TypeScript · Express.js · Docker · Logstash · InfluxDB · 
Prometheus · Swagger · TypeORM · SQLite (test)

## Installation

npm install

## Running

# development
npm run start:dev

# production
npm run start

# build
npm run build

## Testing

npm run test          # unit tests
npm run test:e2e      # e2e tests
npm run test:contract # contract tests

## Database (SQLite example)

npm run typeorm migration:run
npm run seed