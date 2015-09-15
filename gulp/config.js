
module.exports = {

  'scripts': {
    'src': 'app/scripts/**/*.js',
    'dest': 'build/scripts'
  },

  'images': {
    'src': 'app/images/**/*',
    'dest': 'build/images'
  },

  'views': {
    'watch': [
      'app/index.html',
      'app/views/**/*.html'
    ],
    'src': 'app/views/**/*.html',
    'dest': 'build'
  },

  'dist': {
    'root': 'build'
  },

  'browserify': {
    'entries': ['./app/index.js'],
    'bundleName': 'main.js',
    'prodSourcemap': false
  },

  'test': {
    'karma': 'test/karma.conf.js',
    'protractor': 'test/protractor.conf.js'
  }

};
