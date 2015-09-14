
module.exports = {

  'browserPort'  : 3000,
  'UIPort'       : 3001,
  'serverPort'   : 3002,

  'styles': {
    'src' : 'app/styles/**/*.css',
    'dest': 'build/css',
    'prodSourcemap': false
    //'sassIncludePaths': []
  },

  'scripts': {
    'src' : 'app/scripts/**/*.js',
    'dest': 'build/scripts'
  },

  'images': {
    'src' : 'app/images/**/*',
    'dest': 'build/images'
  },

  /*'fonts': {*/
    //'src' : ['app/fonts/**/*'],
    //'dest': 'build/fonts'
  //},

  /*'views': {*/
    //'watch': [
      //'app/index.html',
      //'app/views/**/*.html'
    //],
    //'src': 'app/views/**/*.html',
    //'dest': 'app/js'
  //},

  'gzip': {
    'src': 'build/**/*.{html,xml,json,css,js,js.map,css.map}',
    'dest': 'build/',
    'options': {}
  },

  'dist': {
    'root': 'build'
  },

  'browserify': {
    'entries': ['./app/js/main.js'],
    'bundleName': 'main.js',
    'prodSourcemap': false
  },

  'test': {
    'karma': 'test/karma.conf.js',
    'protractor': 'test/protractor.conf.js'
  }

};
