import Constants from '../Constants';
import angular from 'angular';
import declare from '../declare';

const directivesModule = angular.module(`${Constants.appName}.directives`, []);
const bulk = require('bulk-require');
const directives = bulk(__dirname, ['./**/!(*index|*.spec).js']);

declare(directives, (name, fn) => directivesModule.directive(name, fn));

export default directivesModule;
