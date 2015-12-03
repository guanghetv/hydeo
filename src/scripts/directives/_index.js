/**
 * @author centsent
 */
const bulk = require('bulk-require');

export default angular.module('hydeo.directives', []);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
