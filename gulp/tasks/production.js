import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('prod', ['clean'], (cb) => {
  const tasks = ['styles', 'fonts', 'views', 'browserify'];
  global.isProd = true;

  runSequence(tasks, cb);
});
