import { RequestHandler } from 'express';
import { LoggerService } from '../../../modules/logger';

export const helloMiddleware: RequestHandler = (_req, _res, next) => {
  LoggerService.logger.info('Hello from logger middleware!');
  next();
};
