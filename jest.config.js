module.exports = {
  verbose: true,
  setupFiles: ['./jest.setup.js'],
  collectCoverageFrom: ['./src/*.js', './src/**/*.js', '!src/index.js'],
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'jsx'],
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
