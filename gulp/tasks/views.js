/**
 * @author centsent
 */
import config from '../config';
import gulp from 'gulp';
import browserSync from 'browser-sync';

// Views task
gulp.task('views', () => {
  return gulp.src(config.views.src)
    // .pipe(gulp.dest(config.views.dest))
    .pipe(browserSync.stream());
});
