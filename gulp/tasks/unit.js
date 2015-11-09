import gulp from 'gulp';
import {Server} from 'karma';
import path from 'path';
import config from '../config';

gulp.task('unit', ['views'], (done) => {
  new Server({
    configFile: path.resolve(config.test.karma),
    singleRun: true
  }, done).start();
});
