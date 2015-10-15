import 'angular';
import constants from './constants';
// angular modules
import './controllers/_index';
import './services/_index';
import './directives/_index';
import './';

const modules = [
  'hydeo.controllers',
  'hydeo.services',
  'hydeo.directives'
];
const app = angular.module('hydeo', modules).constant('AppSettings', constants);

export default app;
