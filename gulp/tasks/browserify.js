/**
 * @author centsent
 */
import config from '../config';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import buffer from 'vinyl-buffer';
import streamify from 'gulp-streamify';
import watchify from 'watchify';
import browserify from 'browserify';
import uglify from 'gulp-uglify';
import handleErrors from '../util/handleErrors';
import browserSync from 'browser-sync';
import ngAnnotate from 'browserify-ngannotate';
import stringify from 'stringify';
import eventStream from 'event-stream';
import fs from 'fs';

function buildScript(entries, file) {
  let bundler = browserify({
    entries: entries,
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: !global.isProd
  });

  const transforms = [
    stringify(['.html']),
    'babelify',
    ngAnnotate,
    'brfs',
    'bulkify'
  ];

  transforms.forEach((transform) => {
    bundler.transform(transform);
  });

  function rebundle() {
    const stream = bundler.bundle();
    const createSourcemap = global.isProd && config.browserify.prodSourcemap;

    gutil.log(`Rebundle...${file}`);

    return stream.on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulpif(createSourcemap, buffer()))
      .pipe(gulpif(createSourcemap, sourcemaps.init()))
      .pipe(streamify(uglify({
        compress: {
          drop_console: true
        }
      })))
      .pipe(gulpif(createSourcemap, sourcemaps.write('./')))
      .pipe(gulp.dest(config.dist.root))
      .pipe(browserSync.stream({
        once: true
      }));
  }

  if (!global.isProd) {
    bundler = watchify(bundler);
    bundler.on('update', () => {
      rebundle();
    });
  }

  return rebundle();
}

gulp.task('browserify', ['lint'], () => {
  if (global.isProd) {
    return buildScript([config.browserify.entry], config.browserify.bundleName);
  }

  const entries = config.browserify.entries.filter(item => {
    return fs.existsSync(item.src);
  });
  const tasks = entries.map(entry => {
    return buildScript([entry.src], entry.bundleName);
  });

  return eventStream.merge.apply(null, tasks);
});
