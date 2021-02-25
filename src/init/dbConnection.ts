import { createConnection } from 'typeorm';
import { DbConfigPostgres } from '../../configs/db.config';
import { DbConfigSqlite } from '../../configs/sqlite.config';
import { ConfigService } from '../modules/config';

export async function dbConnection() {
  const dbConfig = ConfigService.get<DbConfigPostgres>('dbConfig');

  if (dbConfig) {
    await createConnection(dbConfig);
    return;
  }

  const sqliteConfig = ConfigService.get<DbConfigSqlite>('sqliteConfig');

  if (sqliteConfig) {
    await createConnection({ ...sqliteConfig, logging: false, name: 'sqlite' });
  }
}
