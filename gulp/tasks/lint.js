import config from '../config';
import gulp from 'gulp';
import eslint from 'gulp-eslint';

gulp.task('lint', () => {
  return gulp.src([config.scripts.src, '!app/js/templates.js'])
    .pipe(eslint());
});
