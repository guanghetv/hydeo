import angular from 'angular';
import bulk from 'bulk-require';

module.exports = angular.module('hydeo.services', []);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
