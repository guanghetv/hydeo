import config       from '../config';
import gulp         from 'gulp';
import gulpif       from 'gulp-if';
import sourcemaps   from 'gulp-sourcemaps';
import handleErrors from '../util/handleErrors';
import browserSync  from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';

gulp.task('styles', function () {

  return gulp.src(config.styles.src)
    .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.styles.dest))
    .pipe(browserSync.stream({ once: true }));

});
