/**
 * @author centsent
 */
import 'angular-sanitize';

const bulk = require('bulk-require');
const modules = [
  'ngSanitize'
];

export default angular.module('hydeo.directives', modules);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
