const istanbul = require('browserify-istanbul');
const isparta = require('isparta');
const stringify = require('stringify');

module.exports = (config) => {
  const configuration = {
    basePath: '../',
    frameworks: ['jasmine', 'browserify'],
    preprocessors: {
      'src/scripts/**/*.js': ['browserify', 'babel', 'coverage'],
      'test/**/*.js': ['browserify', 'babel', 'coverage']
    },
    browsers: ['Chrome'],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    reporters: ['progress', 'coverage'],

    autoWatch: true,

    browserify: {
      debug: true,
      transform: [
        stringify(['.html']),
        'babelify',
        'bulkify',
        'stringify',
        istanbul({
          instrumenter: isparta,
          ignore: ['**/node_modules/**', '**/test/**']
        })
      ]
    },

    proxies: {
      '/': 'http://localhost:9876/'
    },

    urlRoot: '/__karma__/',

    files: [
      // app-specific code
      // 'src/scripts/main.js',
      // 3rd-party resources
      // 'node_modules/angular/angular.js',
      // 'node_modules/angular-mocks/angular-mocks.js',
      // test files
      'test/**/*.js'
    ]

  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration);
};
