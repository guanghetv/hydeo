import angular from 'angular';
const bulk = require('bulk-require');

module.exports = angular.module('hydeo.services', []);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
