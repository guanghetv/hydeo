import angular from 'angular';

const directivesModule = angular.module('hydeo.directives', []);
const bulk = require('bulk-require');
const directives = bulk(__dirname, ['./**/!(*index|*.spec).js']);

function declare(directiveMap) {
  Object.keys(directiveMap)
    .forEach((name) => {
      const item = directiveMap[name];

      if (typeof item === 'function') {
        directivesModule.directive(name, item);
      } else {
        declare(item);
      }
    });
}

declare(directives);

export default directivesModule;
