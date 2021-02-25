import * as logform from 'logform';
import * as winston from 'winston';
import { LogstashTransport } from 'winston-logstash-ts';
import * as Transport from 'winston-transport';
import { logstashConfig } from '../../../configs/logstash.config';
import { ConfigService } from '../config';

export class LoggerService {
  static logger: ReturnType<typeof winston.createLogger>;

  static init() {
    const logstashConfiguration = ConfigService.get<typeof logstashConfig>(
      'logstashConfig',
    );
    const transports: Transport[] = [] as Transport[];

    if (logstashConfiguration) {
      const logstash = new LogstashTransport({
        host: logstashConfiguration.logstashHost,
        port: logstashConfiguration.logstashPort,
        protocol: logstashConfiguration.logstashProtocol,
        format: logform.format.combine(
          logform.format.timestamp(),
          logform.format.logstash(),
        ),
      });
      transports.push(logstash);
    }

    const infoFilter = winston.format((info, _opts) =>
      info.level === 'info' ? info : false,
    );
    const consoleInfo = new winston.transports.Console({
      format: winston.format.combine(
        infoFilter(),
        winston.format.colorize({ all: true }),
        winston.format.simple(),
      ),
      level: 'info',
      silent: process.env.NODE_ENV === 'production',
    });
    transports.push(consoleInfo);

    const noticeFilter = winston.format((info, _opts) =>
      info.level === 'notice' ? info : false,
    );
    const consoleNotice = new winston.transports.Console({
      format: winston.format.combine(
        noticeFilter(),
        winston.format.colorize({ all: true }),
        winston.format.simple(),
      ),
      level: 'notice',
    });
    transports.push(consoleNotice);

    const infoWarnFilter = winston.format((info, _opts) =>
      info.level === 'warn' ? info : false,
    );
    const consoleWarn = new winston.transports.Console({
      format: winston.format.combine(
        infoWarnFilter(),
        winston.format.colorize({ all: true }),
        winston.format.simple(),
      ),
      level: 'warn',
    });
    transports.push(consoleWarn);

    const errorFilter = winston.format((info, _opts) =>
      info.level === 'error' ? info : false,
    );
    const consoleError = new winston.transports.Console({
      format: winston.format.combine(
        errorFilter(),
        winston.format.colorize({ all: true }),
        winston.format.simple(),
      ),
      level: 'error',
    });
    transports.push(consoleError);

    const logger = winston.createLogger({
      transports,
      levels: {
        error: 0,
        warn: 1,
        notice: 2,
        info: 3,
        http: 4,
        verbose: 5,
        debug: 6,
        silly: 7,
      },
    });

    this.logger = logger;

    return this.logger;
  }
}
