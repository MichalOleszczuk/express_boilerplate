import { LogstashOption } from 'winston-logstash-ts';
import { ConfigService } from '../src/modules/config/config.service';

export const logstashConfig = ConfigService.registerAs('logstashConfig', () => {
  const logstashEntries = ConfigService.applicationYml.logstash;

  if (!logstashEntries) return;

  // eslint-disable-next-line consistent-return
  return {
    logstashHost: (logstashEntries.LOGSTASH_HOST as string) || 'localhost',
    logstashPort: parseInt(logstashEntries.LOGSTASH_PORT || '9600', 10),
    logstashProtocol: (logstashEntries.LOGSTASH_PROTOCOL ||
      'tcp') as LogstashOption['protocol'],
  };
});
