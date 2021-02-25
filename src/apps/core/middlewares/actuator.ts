import * as actuator from 'express-actuator';

const options = {
  basePath: '/actuator',
  infoGitMode: 'full' as actuator.InfoGitMode,
};

export const actuatorMiddleware = actuator(options);
