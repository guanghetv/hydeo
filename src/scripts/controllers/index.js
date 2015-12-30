/**
 * @author centsent
 */
import Constants from '../Constants';
import angular from 'angular';
import declare from '../declare';

const controllersModule = angular.module(`${Constants.appName}.controllers`, []);
const bulk = require('bulk-require');
const controllers = bulk(__dirname, ['./**/!(*index|*.spec).js']);

declare(controllers, (name, fn) => controllersModule.controller(name, fn));

export default controllersModule;
