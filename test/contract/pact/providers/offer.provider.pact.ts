import { Pact } from '@pact-foundation/pact';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';

export function setupPactProvider() {
  const { EXTERNAL_CONFIG_FILES } = process.env;

  const configPath = JSON.parse(EXTERNAL_CONFIG_FILES)[0];

  const config = yaml.load(
    fs.readFileSync(path.normalize(configPath), 'utf8'),
  ) as any;

  const offersProvider = new Pact({
    host: 'localhost',
    port: config.externalSystem.port,
    consumer: 'OffersClient',
    provider: 'OffersApi',
    dir: path.normalize(path.join(__dirname, '../pacts')),
  });

  return offersProvider;
}
