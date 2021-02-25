module.exports = {
  globalSetup: '<rootDir>/test/e2e/globalSetup.ts',
  globalTeardown: '<rootDir>/test/e2e/globalTeardown.ts',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: process.cwd(),
  testEnvironment: 'node',
  testRegex: '.*\\.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
