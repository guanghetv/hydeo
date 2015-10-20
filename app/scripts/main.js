/**
 * App main file.
 *
 * @author centsent
 *
 */
import 'angular';
import AppSettings from './AppSettings';
import controllersModule from './controllers/_index';
import servicesModule from './services/_index';
import directivesModule from './directives/_index';
import './';

const modules = [
  controllersModule.name,
  servicesModule.name,
  directivesModule.name
];
const app = angular.module(AppSettings.appName, modules);

app.constant('AppSettings', AppSettings);

export default app;
