/**
 * App main file.
 *
 * @author centsent
 *
 */
import angular from 'angular';
import Constants from './Constants';
import controllersModule from './controllers';
import servicesModule from './services';
import directivesModule from './directives/_index';

const modules = [
  controllersModule.name,
  servicesModule.name,
  directivesModule.name,
];
const app = angular.module(Constants.appName, modules);

app.constant('AppSettings', Constants);

export default app;
