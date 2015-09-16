import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('prod', ['clean'], (cb) => {
  const b = cb || () => {};
  global.isProd = true;

  runSequence(['styles', 'images', 'fonts', 'views', 'browserify'], 'gzip', b);
});
