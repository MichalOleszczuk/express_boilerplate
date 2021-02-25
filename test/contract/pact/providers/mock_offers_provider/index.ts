/* eslint-disable no-console */
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';
import * as sampleOffersJson from './get-offers.json';
import express = require('express');

export function startMockProvider() {
  const app = express();

  const { EXTERNAL_CONFIG_FILES } = process.env;
  const configPath = path.normalize(JSON.parse(EXTERNAL_CONFIG_FILES)[0]);

  const config = yaml.load(fs.readFileSync(configPath, 'utf8')) as any;

  const { port } = config.externalSystem;

  app.get('/offer', (_req, res) => {
    res.json({ offers: sampleOffersJson.offers });
  });

  const server = app.listen(port);

  return server;
}
