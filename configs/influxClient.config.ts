import { ConfigService } from '../src/modules/config/config.service';

export const influxClientConfig = ConfigService.registerAs(
  'influxClientConfig',
  () => {
    const infuxClientEntries = ConfigService.applicationYml.infuxClient;

    if (!infuxClientEntries) return;

    // eslint-disable-next-line consistent-return
    return {
      url: (infuxClientEntries.INFLUX_URL as string) || 'http://localhost:8086',
      database: (infuxClientEntries.INFLUX_DATABASE as string) || 'defaultdb',
      retentionPolicy:
        (infuxClientEntries.INFLUX_RETENTION_POLICY as string) || 'autogen',
      organization:
        (infuxClientEntries.INFLUX_ORGANIZATION as string) || 'default',
      sendIntervalMs:
        (infuxClientEntries.INFLUX_SEND_INTERVAL_MS as number) || 10000,
    };
  },
);
