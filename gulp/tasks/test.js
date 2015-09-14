import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('test', ['server'], function() {

  return runSequence('unit', 'protractor');

});
