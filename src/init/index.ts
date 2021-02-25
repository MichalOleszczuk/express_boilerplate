import * as path from 'path';
import { ConfigService } from '../modules/config';
import { LoggerService } from '../modules/logger';
import { DirectSendMetricsService } from '../modules/directSendMetrics';
import { dbConnection } from './dbConnection';

export async function init() {
  const configsFactoriesPath = path.join(__dirname, '../../configs');
  await ConfigService.load(configsFactoriesPath);
  LoggerService.init();
  DirectSendMetricsService.start();
  await dbConnection();
}
