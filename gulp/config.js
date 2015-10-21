export default {

  'browserPort': 3000,
  'UIPort': 3001,
  'serverPort': 3002,

  'styles': {
    'src': 'app/styles/**/*.scss',
    'dest': 'build/styles',
    'prodSourcemap': false,
    'sassIncludePaths': []
  },

  'scripts': {
    'src': 'app/scripts/**/*.js',
    'dest': 'build/scripts'
  },

  'images': {
    'src': 'app/images/**/*',
    'dest': 'build/images'
  },

  'fonts': {
    'src': ['app/fonts/**/*'],
    'dest': 'build/fonts'
  },

  'views': {
    'watch': [
      'app/index.html',
      'app/views/**/*.html'
    ],
    'src': 'app/views/**/*.html',
    'dest': 'app/scripts'
  },

  'gzip': {
    'src': 'build/**/*.{html,xml,json,css,js,js.map,css.map}',
    'dest': 'build/',
    'options': {}
  },

  'dist': {
    'root': 'build'
  },

  'browserify': {
    'entries': ['./app/scripts/main.js'],
    'bundleName': 'hydeo.js',
    'prodSourcemap': false
  },

  'test': {
    'karma': 'test/karma.conf.js',
    'protractor': 'test/protractor.conf.js'
  }

};
