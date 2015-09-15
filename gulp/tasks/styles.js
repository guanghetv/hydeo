import config       from '../config';
import gulp         from 'gulp';
import handleErrors from '../util/handleErrors';
import browserSync  from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';

gulp.task('styles', () => {
  return gulp.src(config.styles.src)
    .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.styles.dest))
    .pipe(browserSync.stream({ once: true }));
});
