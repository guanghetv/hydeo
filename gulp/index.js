/**
 * @author centsent
 */
import requireDir from 'require-dir';

// Require all tasks in gulpfile.js/tasks, including subfolders
requireDir('./tasks', {recurse: true});
