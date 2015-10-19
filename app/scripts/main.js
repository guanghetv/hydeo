/**
 * App main file.
 *
 * @author centsent
 *
 */
import 'angular';
import constants from './constants';
import controllersModule from './controllers/_index';
import servicesModule from './services/_index';
import directivesModule from './directives/_index';

const modules = [
  controllersModule.name,
  servicesModule.name,
  directivesModule.name
];
const app = angular.module(constants.appName, modules);

app.constant('AppSettings', constants);

export default app;
