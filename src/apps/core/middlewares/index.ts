import * as bodyParser from 'body-parser';
import { actuatorMiddleware } from './actuator';
import { loggerMiddleware } from './logger';
import { openApi } from './openApi';
import { allowOrigins } from './origins';

export const coreMiddlewares = [
  // logger
  loggerMiddleware,

  // CORS
  allowOrigins,

  // actuator
  actuatorMiddleware,

  // openApi (Swagger)
  openApi,

  // parse application/json
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
];
