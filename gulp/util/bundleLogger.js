/* bundleLogger
 * ------------
 * Provides gulp style logs to the bundle method in browserify.js
 */

import gutil        from 'gulp-util';
import prettyHrtime from 'pretty-hrtime';
import startTime;

module.exports = {

  start: function() {
    startTime = process.hrtime();
    gutil.log('Running', gutil.colors.green('\'bundle\'') + '...');
  },

  end: function() {
    var taskTime = process.hrtime(startTime);
    var prettyTime = prettyHrtime(taskTime);
    gutil.log('Finished', gutil.colors.green('\'bundle\''), 'in', gutil.colors.magenta(prettyTime));
  }

};
