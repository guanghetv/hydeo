import directivesModule from './_index';
//import template from '../../views/directives/csCuepoint.html';

/**
 *
 * Do not use ES6 class to define a directive, because,
 * the link function is not called in the context of the directive object.
 * So, this reference inside the link function is not same as the
 * directive object.
 *
 */
function cuepointDirective() {
  return {
    restrict: 'E',
    template: template,
    link: function link($scope, elem) {

    }
  };
}

directivesModule.directive('csCuepoint', cuepointDirective);
