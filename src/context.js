import { PropTypes } from 'react';

const { number, object, bool, func } = PropTypes;

export const contextTypes = {
  buffered: object,
  paused: bool,
  muted: bool,
  isFullScreen: bool,
  totalTime: number,
  currentTime: number,
  volume: number,
  percentageBuffered: number,
  percentagePlayed: number,
  play: func,
  pause: func,
  togglePlay: func,
  mute: func,
  unmute: func,
  setVolume: func,
  toggleVolume: func,
  requestFullScreen: func,
  exitFullScreen: func,
  toggleFullScreen: func,
};
