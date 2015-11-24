/**
 * @author centsent
 */
import config from '../config';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import handleErrors from '../util/handleErrors';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';

gulp.task('styles', () => {
  const createSourcemap = !global.isProd || config.styles.prodSourcemap;

  return gulp.src(config.styles.src)
    .pipe(gulpif(createSourcemap, sourcemaps.init()))
    .pipe(sass({
      sourceComments: !global.isProd,
      outputStyle: global.isProd ? 'compressed' : 'nested',
      includePaths: config.styles.sassIncludePaths
    }))
    .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
    .on('error', handleErrors)
    .pipe(gulpif(
      createSourcemap,
      sourcemaps.write(global.isProd ? './' : null)))
    .pipe(gulp.dest(config.styles.dest))
    .pipe(browserSync.stream({
      once: true
    }));
});
