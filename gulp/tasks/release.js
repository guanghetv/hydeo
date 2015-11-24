/**
 * @author centsent
 */
import gulp from 'gulp';
import config from '../config';

gulp.task('release', ['prerelease'], () => {
  const bundleFile = `${config.dist.root}/${config.browserify.bundleName}`;
  gulp.src(bundleFile).pipe(gulp.dest('./'));
});
