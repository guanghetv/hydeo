import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('test', ['serve'], () => {
  return runSequence('unit', 'protractor');
});
