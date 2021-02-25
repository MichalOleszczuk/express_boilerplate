import * as promClient from 'prom-client';
import { DbConfigPostgres } from '../../../configs/db.config';
import { name } from '../../../package.json';
import { ConfigService } from '../config';
import { gatherPoolSize } from './parameters/dbPoolSize';
import { responseCounters } from './parameters/responseCounters';

promClient.register.setDefaultLabels({
  app: name,
});

// Enable the collection of default metrics
promClient.collectDefaultMetrics();

export class MetricsService {
  static getResponseCountersMiddleware() {
    return responseCounters;
  }

  static getMetrics() {
    const dbConfig = ConfigService.get<DbConfigPostgres>('dbConfig');

    if (dbConfig) {
      gatherPoolSize();
    }

    const metrics = promClient.register.getMetricsAsJSON();
    return metrics;
  }

  static getMetricsAsString() {
    const dbConfig = ConfigService.get<DbConfigPostgres>('dbConfig');

    if (dbConfig) {
      gatherPoolSize();
    }

    const metrics = promClient.register.metrics();
    return metrics;
  }
}
