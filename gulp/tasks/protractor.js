import config from '../config';
import gulp from 'gulp';
import { protractor, webdriver, webdriverUpdate } from 'gulp-protractor';

gulp.task('webdriver-update', webdriverUpdate);
gulp.task('webdriver', webdriver);

gulp.task('protractor', ['webdriver-update', 'webdriver', 'server'], (cb) => {
  gulp.src('test/e2e/**/*.js').pipe(protractor({
    configFile: config.test.protractor,
  })).on('error', (err) => {
    // Make sure failed tests cause gulp to exit non-zero
    throw err;
  }).on('end', () => {
    process.exit();
    cb();
  });
});
