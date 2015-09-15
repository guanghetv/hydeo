import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('dev', ['clean'], (cb) => {
  const buffer = cb || () => {};
  global.isProd = false;

  runSequence(['styles', 'images', 'views', 'browserify'], 'watch', buffer);
});
