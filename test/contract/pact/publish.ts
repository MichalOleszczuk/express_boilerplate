/* eslint-disable no-console */
import { Publisher } from '@pact-foundation/pact';
import * as getRepoInfo from 'git-repo-info';
import * as path from 'path';

const info = getRepoInfo();

const opts = {
  pactFilesOrDirs: [path.resolve(__dirname, './pacts')],
  pactBroker: 'http://localhost:9292/',
  consumerVersion: info.sha,
  tags: [info.branch],
};

async function publish() {
  try {
    await new Publisher(opts).publishPacts();
    console.log('Pact contract publishing complete!');
  } catch (error) {
    console.error(error);
  }
}

publish();
