/* eslint-disable no-console */
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';
import * as sampleOffersJson from './get-offers.json';
import express = require('express');

function mockServer() {
  const app = express();

  const EXTERNAL_CONFIG_FILE = path.join(__dirname, '../../../application.yml');
  const configPath = path.normalize(EXTERNAL_CONFIG_FILE);

  const config = yaml.load(fs.readFileSync(configPath, 'utf8')) as any;

  const { port } = config.externalSystem;

  app.get('/offer', (_req, res) => {
    res.json({ offers: sampleOffersJson.offers });
  });

  const server = app.listen(port);
  console.log(`Mock server listening on ${port}`);
  return server;
}

mockServer();
