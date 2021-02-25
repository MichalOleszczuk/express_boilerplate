import * as expressWinston from 'express-winston';
import { LoggerService } from '../../../modules/logger';

export const loggerMiddleware = expressWinston.logger({
  winstonInstance: LoggerService.logger,
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: false,
});

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');
