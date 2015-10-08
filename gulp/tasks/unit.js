import gulp from 'gulp';
import {Server} from 'karma';
import config from '../config';

gulp.task('unit', ['views'], (done) => {
  new Server({
    configFile: config.test.karma,
    singleRun: true
  }, done).start();
});
