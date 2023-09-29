/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['lib/'],
  collectCoverageFrom: ['src/*'],
  coverageThreshold: {
    global: {
      lines: 90,
      functions: 100
    }
  }
};
