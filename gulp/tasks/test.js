import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('test', ['server'], () => {

  return runSequence('unit', 'protractor');

});
