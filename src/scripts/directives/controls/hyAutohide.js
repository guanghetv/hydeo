const defaultOptions = {
  autohide: true,
  autohideTime: 2000,
};

function hyAutohide($hyOptions) {
  'ngInject';

  return {
    restrict: 'A',
    link($scope, elem, attrs) {
      const autohide = attrs.hyAutohide;
      const autohideTime = parseInt(attrs.autohideTime, 10) || defaultOptions.autohideTime;
      const hydeoElement = $hyOptions.get('hydeoElement');

      if (autohide !== undefined && autohide !== 'false') {
        hydeoElement.bind('mousemove', () => {
          elem.css('display', 'block');
          setTimeout(() => {
            elem.css('display', 'none');
          }, autohideTime);
        }).bind('mouseout', () => elem.css('display', 'none'));

        /* elem.bind('mouseover', () => { */
          // clearTimeout(timeout);
          // elem.css('display', 'block');
        /* }); */

        setTimeout(() => {
          elem.css('display', 'none');
        }, autohideTime);
      }
    },
  };
}

export default hyAutohide;
