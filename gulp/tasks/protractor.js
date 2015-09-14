import config          from '../config';
import gulp            from 'gulp';
import gulpProtractor  from 'gulp-protractor';

var protractor      = gulpProtractor.protractor;
var webdriver       = gulpProtractor.webdriver;
var webdriverUpdate = gulpProtractor.webdriver_update;

gulp.task('webdriver-update', webdriverUpdate);
gulp.task('webdriver', webdriver);

gulp.task('protractor', ['webdriver-update', 'webdriver', 'server'], function(cb) {

  gulp.src('test/e2e/**/*.js').pipe(protractor({
      configFile: config.test.protractor
  })).on('error', function(err) {
    // Make sure failed tests cause gulp to exit non-zero
    throw err;
  }).on('end', function() {
    process.exit();
    cb();
  });

});
