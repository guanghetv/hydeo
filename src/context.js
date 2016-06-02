import { PropTypes } from 'react';

const { number, object, bool, func } = PropTypes;

export const contextTypes = {
  media: object,
  container: object,
  buffered: object,
  isFullScreen: bool,
  isMuted: bool,
  isPaused: bool,
  isPlayed: bool,
  isAutoPlay: bool,
  isEnded: bool,
  isOnCuepoint: bool,
  duration: number,
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
  seek: func,
  on: func,
  changeSource: func,
};
