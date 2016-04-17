import { PropTypes } from 'react';

export const propTypes = {
  src: PropTypes.string.isRequired,
  autoPlay: PropTypes.bool,
  cuepoints: PropTypes.array,
};

export const defaultProps = {
  autoPlay: false,
  cuepoints: [],
};
