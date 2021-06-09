/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  // this will become default in jest 27:
  testRunner: 'jest-circus/runner',

  testRegex: '__tests__/.+\\.(test|spec)\\.(js|jsx)$',

  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    // '^.+\\.html$': '<rootDir>/jest/__mocks__/html-loader.js',
  },

  setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],

  // moduleNameMapper: {
  //   // File extensions
  //   '\\.(txt|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
  //     '<rootDir>/jest/__mocks__/file-mock.js',
  //   '\\.(css|less)$': '<rootDir>/jest/__mocks__/empty-module.js',
  //   '\\.svg': '<rootDir>/jest/__mocks__/svg-mock.jsx',
  // },

  testPathIgnorePatterns: [
    'chart-modules/common/picasso/disclaimer/__tests__/disclaimer.spec.js',
    'chart-modules/common/picasso/tooltip/__tests__/tooltips-handler.spec.js',
  ],

  // collectCoverageFrom: [
  //   'web/**/*.{js,jsx}',
  //   '!web/**/*.spec.{js,jsx}',
  // ],

  coverageReporters: ['json', 'lcov', 'text-summary', 'clover'],
};
