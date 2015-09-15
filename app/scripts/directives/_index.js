import angular from'angular';
import bulk from'bulk-require';

const modules = [
  'ngSanitize',
  'com.2fdevs.videogular',
  'com.2fdevs.videogular.plugins.controls',
  'uk.ac.soton.ecs.videogular.plugins.cuepoints'
];
module.exports = angular.module('hydeo.directives', modules);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
