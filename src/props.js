import { PropTypes } from 'react';

export const propTypes = {
  src: PropTypes.string.isRequired,
  autoPlay: PropTypes.bool,
};

export const defaultProps = {
  autoPlay: false,
};
