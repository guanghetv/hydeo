import gulp from 'gulp';
import runSequence from 'run-sequence';
import config from '../config';

gulp.task('dev', ['clean'], (cb) => {
  const b = cb || () => {};
  global.isProd = false;

  gulp.src('./examples/*')
    .pipe(gulp.dest(config.dist.root));

  runSequence(['styles', 'fonts', 'views', 'browserify'], 'watch', b);
});
