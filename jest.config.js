/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['lib/'],
    collectCoverageFrom: ['src/*'],
    coverageProvider: 'v8',
    coverageThreshold: {
        global: {
            lines: 90,
            functions: 100,
            branches: 80
        }
    }
}
