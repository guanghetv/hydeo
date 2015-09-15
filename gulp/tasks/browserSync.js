import config      from '../config';
import browserSync from 'browser-sync';
import gulp        from 'gulp';

gulp.task('browserSync', () => {

  browserSync({
    port: config.browserPort,
    ui: {
      port: config.UIPort
    },
    proxy: 'localhost:' + config.serverPort
  });

});
