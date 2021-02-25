import * as path from 'path';
import { DbConfigSqlite } from './configs/sqlite.config';
import { ConfigService } from './src/modules/config';

async function getOrmConfig() {
  const configsFactoriesPath = path.join(__dirname, './configs');
  await ConfigService.load(configsFactoriesPath);

  const sqliteConfig = ConfigService.get<DbConfigSqlite>('sqliteConfig');

  return sqliteConfig;
}

export = getOrmConfig();
