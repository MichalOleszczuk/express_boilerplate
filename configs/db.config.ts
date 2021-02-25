import * as path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConfigService } from '../src/modules/config/config.service';

export type MutableRequired<T> = { -readonly [P in keyof T]: T[P] };
export type DbConfigPostgres = MutableRequired<PostgresConnectionOptions>;

export const dbPrefix = 'DB_';

export const dbConfig = ConfigService.registerAs('dbConfig', () => {
  const dbYml = ConfigService.applicationYml.database;
  if (!dbYml) return;

  let config: DbConfigPostgres = {
    type: 'postgres' as DbConfigPostgres['type'],
    maxQueryExecutionTime: 1000,
  };

  const dbEntries = Object.entries<any>(dbYml).filter(([envKey]) =>
    envKey.startsWith(dbPrefix),
  );

  const fileExtension = __filename.split('.').pop();
  const srcRelativePath = fileExtension === 'ts' ? './' : './build';

  config = dbEntries.reduce((map, [envKey, envVar]) => {
    const reducedMap = map;
    const mapKey = envKey.split(dbPrefix)[1].toLowerCase();

    if (mapKey === 'entities') {
      const entitiesPath = path.join(process.cwd(), srcRelativePath, envVar);
      reducedMap[mapKey] = [entitiesPath];
      return map;
    }

    if (mapKey === 'migrations') {
      const entitiesPath = path.join(process.cwd(), srcRelativePath, envVar);
      reducedMap[mapKey] = [entitiesPath];
      return map;
    }

    reducedMap[mapKey] = envVar;
    return reducedMap;
  }, config);

  // eslint-disable-next-line consistent-return
  return config;
});
