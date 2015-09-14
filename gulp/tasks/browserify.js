import config       from '../config';
import handleErrors from '../util/handleErrors';
import gulp         from 'gulp';
import gulpif       from 'gulp-if';
import gutil        from 'gulp-util';
import source       from 'vinyl-source-stream';
import sourcemaps   from 'gulp-sourcemaps';
import buffer       from 'vinyl-buffer';
import streamify    from 'gulp-streamify';
import watchify     from 'watchify';
import browserify   from 'browserify';
import babelify     from 'babelify';
import uglify       from 'gulp-uglify';
import browserSync  from 'browser-sync';
import debowerify   from 'debowerify';
import ngAnnotate   from 'browserify-ngannotate';

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
var buildScript = (file) => {

  var bundler = browserify({
    entries: config.browserify.entries,
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: !global.isProd
  });

  if ( !global.isProd ) {
    bundler = watchify(bundler);
    bundler.on('update', () => {
      rebundle();
    });
  }

  var transforms = [
    babelify,
    debowerify,
    ngAnnotate,
    'brfs',
    'bulkify'
  ];

  transforms.forEach((transform) => {
    bundler.transform(transform);
  });

  var rebundle = () => {
    var stream = bundler.bundle();
    var createSourcemap = global.isProd && config.browserify.prodSourcemap;

    gutil.log('Rebundle...');

    return stream.on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulpif(createSourcemap, buffer()))
      .pipe(gulpif(createSourcemap, sourcemaps.init()))
      .pipe(gulpif(global.isProd, streamify(uglify({
        compress: { drop_console: true }
      }))))
      .pipe(gulpif(createSourcemap, sourcemaps.write('./')))
      .pipe(gulp.dest(config.scripts.dest))
      .pipe(browserSync.stream({ once: true }));
  };

  return rebundle();

};

gulp.task('browserify', () => {

  return buildScript('main.js');

});
