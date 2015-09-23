import angular from 'angular';
import 'angular-sanitize';
import 'videogular/videogular';
import 'videogular-controls/vg-controls';

const bulk = require('bulk-require');
const modules = [
  'ngSanitize',
  'com.2fdevs.videogular',
  'com.2fdevs.videogular.plugins.controls'
];
module.exports = angular.module('hydeo.directives', modules);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
