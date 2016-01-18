import config from '../config';
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import gulpif from 'gulp-if';

gulp.task('lint', () => {
  return gulp.src([config.scripts.src])
    // attaches the lint output to the eslint property
    // of the file object so it can be used by other modules.
    .pipe(eslint(config.scripts.eslint))
    // outputs the lint results to the console.
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(gulpif(global.isProd, eslint.failAfterError()));
});
