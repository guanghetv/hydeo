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
      let autohideTimeout;

      if (autohide !== undefined && autohide !== 'false') {
        hydeoElement.bind('mousemove', () => {
          clearTimeout(autohideTimeout);
          elem.css('display', 'block');
        }).bind('mouseout', () => elem.css('display', 'none'));

        elem.bind('mouseenter', () => {
          clearTimeout(autohideTimeout);
          elem.css('display', 'block');
        });

        autohideTimeout = setTimeout(() => {
          elem.css('display', 'none');
        }, autohideTime);
      }
    },
  };
}

export default hyAutohide;
