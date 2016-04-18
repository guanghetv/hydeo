import { PropTypes } from 'react';

export const propTypes = {
  src: PropTypes.string,
  autoPlay: PropTypes.bool,
  cuepoints: PropTypes.array,
  onReady: PropTypes.func,
  media: PropTypes.object,
};

export const defaultProps = {
  autoPlay: false,
  cuepoints: [],
  onReady() {},
};
