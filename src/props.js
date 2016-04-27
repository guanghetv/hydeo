import { PropTypes } from 'react';

const { string, bool, array, func, object, number } = PropTypes;

export const propTypes = {
  src: string,
  autoPlay: bool,
  cuepoints: array,
  onReady: func,
  media: object,
  autohide: bool,
  autohideTime: number,
};

export const defaultProps = {
  autoPlay: false,
  autohide: true,
  autohideTime: 2000,
  onReady() {},
};
