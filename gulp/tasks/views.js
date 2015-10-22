import config from '../config';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import templateCache from 'gulp-angular-templatecache';

// Views task
gulp.task('views', () => {
  gulp.src('src/index.html')
    .pipe(gulp.dest(config.dist.root));

  return gulp.src(config.views.src)
    .pipe(templateCache({
      standalone: true
    }))
    .pipe(gulp.dest(config.views.dest))
    .pipe(browserSync.stream());
});
