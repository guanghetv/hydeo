import gulp from 'gulp';
import bump from 'gulp-bump';
import git from 'gulp-git';
import filter from 'gulp-filter';
import tagVersion from 'gulp-tag-version';

function inc(type) {
  return gulp.src(['./package.json', 'bower.json'], {
    cwd: './',
    base: './',
  })
  .pipe(bump({ type }))
  .pipe(gulp.dest('./'))
  .pipe(git.commit(`chore: bump package version ${type}`))
  .pipe(filter('package.json'))
  .pipe(tagVersion());
}

gulp.task('patch', () => inc('patch'));
gulp.task('minor', () => inc('minor'));
gulp.task('major', () => inc('major'));
