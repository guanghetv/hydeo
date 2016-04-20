import { PropTypes } from 'react';

export const propTypes = {
  src: PropTypes.string,
  autoPlay: PropTypes.bool,
  cuepoints: PropTypes.array,
  onReady: PropTypes.func,
  media: PropTypes.object,
  autohideTime: PropTypes.number,
};

export const defaultProps = {
  autoPlay: false,
  cuepoints: [],
  onReady() {},
  autohideTime: 2000,
};
