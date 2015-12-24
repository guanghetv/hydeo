/**
 * @author centsent
 */
import angular from 'angular';

const controllersModule = angular.module('hydeo.controllers', []);
const bulk = require('bulk-require');
const controllers = bulk(__dirname, ['./**/!(*index|*.spec).js']);

Object.keys(controllers)
  .forEach((name) => controllersModule.controller(name, controllers[name]));

function declare(controllerMap) {
  Object.keys(controllerMap)
    .forEach((name) => {
      const item = controllerMap[name];

      if (typeof item === 'function') {
        controllersModule.controller(name, item);
      } else {
        declare(item);
      }
    });
}

declare(controllers);

export default controllersModule;
