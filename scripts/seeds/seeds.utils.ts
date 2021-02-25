import * as fs from 'fs';
import * as path from 'path';
import { createConnection } from 'typeorm';
import { DbConfigSqlite } from '../../configs/sqlite.config';
import { ConfigService } from '../../src/modules/config';

export const srcPath = path.join(process.cwd(), './src');
export const fileExtension = __filename.split('.').pop();
const fileReg = new RegExp(`.seed.${fileExtension}$`);

export async function getSeedsFiles(dir: string) {
  const result: string[] = [];
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true });

  await Promise.all(
    dirents.map(async (dirent) => {
      const res = path.resolve(dir, dirent.name);
      if (dirent.isDirectory()) {
        result.push(...(await getSeedsFiles(res)));
      } else {
        result.push(res);
      }
    }),
  );

  return result.filter((fileName) => fileReg.test(fileName));
}

export async function connectToDatabaseSeeds(logging = true) {
  const configsFactoriesPath = path.join(process.cwd(), './configs');
  await ConfigService.load(configsFactoriesPath);

  const sqliteConfig = ConfigService.get<DbConfigSqlite>('sqliteConfig');

  return createConnection({ ...sqliteConfig, logging });
}
