/* eslint-disable no-underscore-dangle */
/* eslint-disable require-await */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/no-var-requires */
/* INFO: https://jestjs.io/docs/en/configuration#globalsetup-string
 * https://stackoverflow.com/a/65708470
 */
require('ts-node/register');

const globalSetup = async (): Promise<void> => {
  const { setEnvVars } = await import('./setup/setEnvVars');

  setEnvVars();
};

export default globalSetup;
