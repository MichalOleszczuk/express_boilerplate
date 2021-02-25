import { ClientOptions, InfluxDB } from '@influxdata/influxdb-client';
import { influxClientConfig } from '../../../configs/influxClient.config';
import { ConfigService } from '../config';
import { LoggerService } from '../logger';
import { MetricsService } from '../metrics';
import { PromInfluxParser } from './prom-influx-parser';

export class DirectSendMetricsService {
  static interval: NodeJS.Timeout;

  static async sendMetrics(
    influxClientConfiguration: typeof influxClientConfig,
  ) {
    const metrics = await MetricsService.getMetrics();
    const influxPoints = PromInfluxParser.parseToInfluxPoint({ metrics });

    const {
      url,
      database,
      retentionPolicy,
      organization,
    } = influxClientConfiguration;

    const clientOptions: ClientOptions = {
      url,
    };

    const bucket = `${database}/${retentionPolicy}`;
    const influxDBClient = new InfluxDB(clientOptions);
    const writeAPI = influxDBClient.getWriteApi(organization, bucket);
    writeAPI.writePoints(influxPoints);
    await writeAPI.close();
  }

  static start() {
    LoggerService.logger.notice('Metrics monitoring loop started');
    const influxClientConfiguration = ConfigService.get<
      typeof influxClientConfig
    >('influxClientConfig');

    if (influxClientConfiguration) {
      this.interval = setInterval(async () => {
        try {
          await this.sendMetrics(influxClientConfiguration);
        } catch (error) {
          LoggerService.logger.error(`Metrics report failed: ${error.message}`);
          this.stop();
        }
      }, influxClientConfiguration.sendIntervalMs);
    } else {
      LoggerService.logger.warn(`Influx configuration not found.
      Register it with ConfigService or check application.yml`);
    }
  }

  static stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
