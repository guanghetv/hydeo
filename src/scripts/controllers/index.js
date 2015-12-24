/**
 * @author centsent
 */
import angular from 'angular';

const controllersModule = angular.module('hydeo.controllers', []);
const bulk = require('bulk-require');
const controllers = bulk(__dirname, ['./**/!(*_index|*.spec).js']);

Object.keys(controllers)
  .forEach((name) => controllersModule.controller(name, controllers[name]));
