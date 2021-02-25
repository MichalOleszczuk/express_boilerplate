import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigsLoader } from './utils/load-configs';

export class ConfigService {
  static applicationYml: { [key: string]: any } = {} as { [key: string]: any };

  static configs: { [key: string]: any } = {} as { [key: string]: any };

  static async load(configFactoriesDir: string) {
    this.loadLocalEnvs();

    const fileExtension = __filename.split('.').pop();
    const fileReg = new RegExp(`.config.${fileExtension}$`);

    this.applicationYml = ConfigsLoader.load();

    if (path.isAbsolute(configFactoriesDir)) {
      const configFileNames = fs
        .readdirSync(configFactoriesDir)
        .filter((fileName) => fileReg.test(fileName));

      await Promise.all(
        configFileNames.map(async (configName) => {
          const modulePath = path.join(configFactoriesDir, configName);
          await import(modulePath);
        }),
      );
    } else {
      const configFileNames = fs
        .readdirSync(path.resolve(process.cwd(), configFactoriesDir))
        .filter((fileName) => fileReg.test(fileName));

      await Promise.all(
        configFileNames.map(async (configName) => {
          const modulePath = path.join(
            process.cwd(),
            configFactoriesDir,
            configName,
          );
          await import(modulePath);
        }),
      );
    }
  }

  static loadLocalEnvs() {
    const envsPath = path.join(process.cwd(), './env');

    let envFileNames: string[] = [];

    if (fs.existsSync(envsPath)) {
      envFileNames = fs
        .readdirSync(envsPath)
        .filter((fileName) => /^.env/.test(fileName));
    }

    envFileNames.forEach((fileName) => {
      dotenv.config({ path: path.join(envsPath, fileName) });
    });
  }

  static registerAs<IConfigFactoryValue = unknown>(
    configName: string,
    configFactory: () => IConfigFactoryValue,
  ) {
    this.configs[configName] = configFactory();
    return this.configs[configName] as IConfigFactoryValue;
  }

  static get<ConfigValue = unknown>(
    configName: string,
  ): ConfigValue | undefined {
    const result = this.configs[configName];

    return result;
  }
}
