const defaultOptions = {
  autohide: true,
  autohideTime: 2000,
};

function hyAutohide($hyOptions, $hyMedia) {
  'ngInject';

  return {
    restrict: 'A',
    link($scope, elem, attrs) {
      const autohide = attrs.hyAutohide;
      const autohideTime = parseInt(attrs.autohideTime, 10) || defaultOptions.autohideTime;
      const hydeoElement = $hyOptions.get('hydeoElement');
      let timeout;
      let flag = false;

      function hide() {
        elem.css('opacity', 0);
      }

      function show() {
        if (!flag) {
          clearTimeout(timeout);
          elem.css('opacity', 1);
          timeout = setTimeout(hide, autohideTime);
        }
      }

      if (autohide !== undefined && autohide !== 'false') {
        hydeoElement.on('mousemove click', show)
          .on('mouseleave', hide);

        elem.on('mouseenter', () => {
          show();
          flag = true;
          clearTimeout(timeout);
        }).on('mouseleave', () => flag = false);

        timeout = setTimeout(hide, autohideTime);
      }

      $hyMedia.onPause(show);
    },
  };
}

export default hyAutohide;
