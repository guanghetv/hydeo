import angular from 'angular';
import 'angular-sanitize';

const bulk = require('bulk-require');
const modules = [
  'ngSanitize'
];
module.exports = angular.module('hydeo.directives', modules);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
