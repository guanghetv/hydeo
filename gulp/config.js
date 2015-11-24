/**
 * @author centsent
 */
export default {

  browserPort: 3000,
  UIPort: 3001,
  serverPort: 3002,

  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'build/styles',
    prodSourcemap: false,
    sassIncludePaths: []
  },

  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'build/scripts',
    eslint: {
      globals: {
        angular: true
      }
    }
  },

  fonts: {
    src: ['src/fonts/**/*'],
    dest: 'build/fonts'
  },

  views: {
    watch: [
      'src/index.html',
      'src/views/**/*.html'
    ],
    src: 'src/views/**/*.html',
    dest: 'src/scripts'
  },

  gzip: {
    src: 'build/**/*.{html,xml,json,css,js,js.map,css.map}',
    dest: 'build/',
    options: {}
  },

  dist: {
    root: 'build'
  },

  browserify: {
    entry: './src/scripts/main.js',
    bundleName: 'hydeo.js',
    prodSourcemap: false
  },

  test: {
    karma: 'test/karma.conf.js',
    protractor: 'test/protractor.conf.js'
  },

  prerelease: {
    npmFiles: ['package.json', 'README.md', 'index.js']
  }
};
