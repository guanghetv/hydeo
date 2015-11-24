import gulp from 'gulp';
import runSequence from 'run-sequence';
import config from '../config';

gulp.task('prod', ['clean'], (cb) => {
  const tasks = ['styles', 'fonts', 'views', 'browserify'];
  global.isProd = true;

  gulp.src(['package.json', 'README.md', 'index.js'])
    .pipe(gulp.dest(config.dist.root));

  runSequence(tasks, cb);
});
