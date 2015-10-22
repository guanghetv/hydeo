/**
 * @author centsent
 */
export default angular.module('hydeo.controllers', []);

const bulk = require('bulk-require');
bulk(__dirname, ['./**/!(*_index|*.spec).js']);
