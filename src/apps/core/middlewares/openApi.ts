import Router from 'express-promise-router';
import * as fs from 'fs';
import * as path from 'path';
import * as swaggerSpec from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';

const isDirectory = (source: string) => fs.lstatSync(source).isDirectory();

const getDirectories = (source: string) => {
  const directories = fs
    .readdirSync(source)
    .map((name) => path.join(source, name))
    .filter(isDirectory);
  return directories;
};

const fileExtension = __filename.split('.').pop();
const controllerFileReg = new RegExp(`.controller.${fileExtension}$`);
const appsRelativePath =
  fileExtension === 'ts' ? './src/apps' : './build/src/apps';
const appsPath = path.join(process.cwd(), appsRelativePath);
const appNames = getDirectories(appsPath);
const loadedApis = [];

appNames.forEach((appName) => {
  const appRoutesDirPath = path.join(appName, '/controllers');

  if (isDirectory(appRoutesDirPath)) {
    const appRoutesDir = fs.readdirSync(appRoutesDirPath);

    const appRoutesDirByCwd = appRoutesDir.map((fileName) => {
      const fullPath = path
        .join(appRoutesDirPath, fileName)
        .replace(process.cwd(), '.');
      return fullPath;
    });

    const controllerFileNames = appRoutesDirByCwd.filter((fileName) =>
      controllerFileReg.test(fileName),
    );

    loadedApis.push(...controllerFileNames);
  }
});

export const openApi = Router();

const swaggerDefinition = {
  info: {
    title: 'NodeJS Test', // Title (required)
    version: '0.9.0', // Version (required)
    description: 'A sample API', // Description (optional)
  },
};

const options = {
  // Import swaggerDefinitions
  swaggerDefinition,
  // Path to the API docs
  // Note that this path is relative to the current directory from which the Node.js is ran, not the application itself.
  apis: loadedApis,
};

openApi.use('/open-api', swaggerUi.serve);
openApi.get('/open-api', swaggerUi.setup(swaggerSpec(options)));
