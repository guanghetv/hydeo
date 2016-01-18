import gulp from 'gulp';
import config from '../config';

gulp.task('prerelease', ['prod'], () => {
  gulp.src(config.prerelease.npmFiles)
    .pipe(gulp.dest(config.dist.root));
});
