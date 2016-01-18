import gulp from 'gulp';
import config from '../config';
import browserSync from 'browser-sync';

gulp.task('sandbox', () => {
  gulp.src(config.sandbox.src)
    .pipe(gulp.dest(config.sandbox.dest))
    .pipe(browserSync.stream());
});
