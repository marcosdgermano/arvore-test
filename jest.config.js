module.exports = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.setup.js'],
  collectCoverageFrom: ['./src/*.js', './src/**/*.js', './src/**/*.ts', './src/**/*.tsx', '!./src/index.tsx'],
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@services(.*)$': '<rootDir>/src/services$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
  },
  coverageThreshold: {
    './src/**': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  transform: {
    '^.+\\.graphql$': 'jest-transform-graphql',
    '^.+\\.js$': 'babel-jest',
    '\\.svg$': './fileTransformer.js',
  },
};
