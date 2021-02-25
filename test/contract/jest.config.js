module.exports = {
  globalSetup: '<rootDir>/test/e2e/globalSetup.ts',
  globalTeardown: '<rootDir>/test/e2e/globalTeardown.ts',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: process.cwd(),
  testEnvironment: 'node',
  testRegex: '.*\\.provider.verifier.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
