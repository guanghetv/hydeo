/**
 * @author centsent
 */
import angular from 'angular';

const servicesModule = angular.module('hydeo.services', []);
const bulk = require('bulk-require');
const services = bulk(__dirname, ['./**/!(*index|*.spec).js']);

function declare(serviceMap) {
  Object.keys(serviceMap)
    .forEach((name) => {
      const item = serviceMap[name];

      if (typeof item === 'function') {
        servicesModule.service(`$${name}`, item);
      } else {
        declare(item);
      }
    });
}

declare(services);

export default servicesModule;
