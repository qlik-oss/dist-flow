/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  testEnvironment: 'jsdom',
  testRunner: 'jest-circus/runner',

  testRegex: '__tests__/.+\\.(test|spec)\\.(js|jsx)$',

  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    // '^.+\\.html$': '<rootDir>/jest/__mocks__/html-loader.js',
  },
  transformIgnorePatterns: [],

  setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],

  // collectCoverageFrom: [
  //   'web/**/*.{js,jsx}',
  //   '!web/**/*.spec.{js,jsx}',
  // ],

  coverageReporters: ['json', 'lcov', 'text-summary', 'clover'],
};
