import * as path from 'path';

export function setEnvVars() {
  process.env.EXTERNAL_CONFIG_FILES = JSON.stringify([
    path.normalize(path.join(__dirname, './application.yml')),
  ]);
}
