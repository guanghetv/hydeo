/**
 * @author centsent
 */
import angular from 'angular';

const servicesModule = angular.module('hydeo.services', []);
const bulk = require('bulk-require');
const services = bulk(__dirname, ['./**/!(*_index|*.spec).js']);

Object.keys(services)
  .forEach((name) => servicesModule.service(`$${name}`, services[name]));

export default servicesModule;
