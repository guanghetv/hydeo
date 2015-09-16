import gulp from 'gulp';
import gzip from 'gulp-gzip';
import config from '../config';

gulp.task('gzip', () => {
  return gulp.src(config.gzip.src)
    .pipe(gzip(config.gzip.options))
    .pipe(gulp.dest(config.gzip.dest));
});
