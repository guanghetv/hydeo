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
      let timeout;
      let flag = false;

      function show() {
        elem.css('display', 'block');
      }

      function hide() {
        elem.css('display', 'none');
      }

      if (autohide !== undefined && autohide !== 'false') {
        hydeoElement.bind('mousemove', () => {
          if (!flag) {
            clearTimeout(timeout);
            show();
            timeout = setTimeout(hide, autohideTime);
          }
        }).bind('mouseleave', hide);

        elem.bind('mouseenter', () => {
          flag = true;
          clearTimeout(timeout);
        }).bind('mouseleave', () => flag = false);

        timeout = setTimeout(hide, autohideTime);
      }
    },
  };
}

export default hyAutohide;
