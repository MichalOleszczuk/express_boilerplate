import * as fs from 'fs';
import * as getRepoInfo from 'git-repo-info';
import * as path from 'path';

const gitInfoPath = path.join(__dirname, '../git.properties');
const info = getRepoInfo();

const gitProperties = {
  'git.commit.id.abbrev': info.abbreviatedSha,
  'git.commit.id': info.sha,
  'git.branch': info.branch,
  'git.commit.time': info.committerDate,
};

const gitPropString: string = (() => {
  let result = '';

  Object.entries(gitProperties).forEach(([key, value], idx, array) => {
    const line = `${key}=${value}${idx === array.length - 1 ? '' : '\n'}`;
    result = `${result}${line}`;
  });

  return result;
})();

fs.writeFileSync(gitInfoPath, gitPropString);
