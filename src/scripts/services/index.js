/**
 * @author centsent
 */
import Constants from '../Constants';
import angular from 'angular';
import declare from '../declare';

const servicesModule = angular.module(`${Constants.appName}.services`, []);
const bulk = require('bulk-require');
const services = bulk(__dirname, ['./**/!(*index|*.spec).js']);

declare(services, (name, fn) => servicesModule.service(name, fn));

export default servicesModule;
