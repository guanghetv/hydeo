import gulp from 'gulp';
import browserSync from 'browser-sync';

const reload = browserSync.reload;

gulp.task('serve', ['styles', 'views', 'browserify'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['build', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'app/**/*.html',
    'app/images/**/*'
  ]).on('change', reload);

  gulp.watch('app/**/*.html', ['views']);
  gulp.watch('app/styles/**/*.css', ['styles']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

