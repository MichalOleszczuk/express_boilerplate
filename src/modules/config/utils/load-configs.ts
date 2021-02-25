import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { merge } from 'lodash';
import * as path from 'path';

export class ConfigsLoader {
  static config: any = {};

  static load() {
    const files: Array<any> = [];
    const { EXTERNAL_CONFIG_FILES } = process.env;

    if (!EXTERNAL_CONFIG_FILES) {
      const YAML_CONFIG_DEFAULT_PATH = path.join(
        process.cwd(),
        './config/app/application.yml',
      );

      const YAML_CONFIG_DEFAULT_PROJ_PATH = path.join(
        process.cwd(),
        './config/proj/application.yml',
      );

      const YAML_SECRET_DEFAULT_PATH = path.join(
        process.cwd(),
        './secret/app/application.yml',
      );

      const secretPath = path.normalize(YAML_SECRET_DEFAULT_PATH);

      const configProjPath = path.normalize(YAML_CONFIG_DEFAULT_PROJ_PATH);

      const configPath = path.normalize(YAML_CONFIG_DEFAULT_PATH);

      const config = yaml.load(fs.readFileSync(configPath, 'utf8')) as any;

      if (fs.existsSync(secretPath)) {
        const secret = yaml.load(fs.readFileSync(secretPath, 'utf8')) as any;
        files.push(secret);
      }

      if (fs.existsSync(configProjPath)) {
        const projConf = yaml.load(fs.readFileSync(configProjPath, 'utf8'));
        files.push(projConf);
      }

      this.config = merge(config, ...files);
    } else {
      const configFilesPaths = JSON.parse(
        EXTERNAL_CONFIG_FILES,
      ) as Array<string>;

      configFilesPaths.forEach((file) => {
        if (fs.existsSync(file)) {
          const fileString = fs.readFileSync(file, 'utf8').toString();
          const yamlConfig = yaml.load(fileString) as any;
          this.config = merge(this.config, yamlConfig);
        }
      });
    }

    return this.config;
  }
}
