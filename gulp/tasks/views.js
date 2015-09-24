import config from '../config';
import gulp from 'gulp';
import browserSync from 'browser-sync';

// Views task
gulp.task('views', () => {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest(config.dist.root))
    .pipe(browserSync.stream());
});
