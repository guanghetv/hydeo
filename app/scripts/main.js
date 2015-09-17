import angular from 'angular';
import constants from './constants';
import onConfig from './on_config';
import onRun from './on_run';
// angular modules
import 'angular-ui-router';
import './templates';
import './controllers/_index';
//import './services/_index';
//import './directives/_index';

// create and bootstrap application
angular.element(document).ready(() => {
  const appName = 'hydeoApp';
  const modules = [
    'ui.router',
    'templates',
    'hydeo.controllers'
    //'hydeo.services',
    /*'hydeo.directives'*/
  ];
  const app = angular.module(appName, modules);

  app.constant('AppSettings', constants);
  app.config(onConfig);
  app.run(onRun);

  // mount on window for testing
  window.app = app;
  angular.bootstrap(document, [appName]);
});
