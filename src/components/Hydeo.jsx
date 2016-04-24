import React, { Component, Children, cloneElement } from 'react';
import { propTypes, defaultProps } from '../props';
import Hls from 'hls.js';
import throttle from 'lodash.throttle';
import FullScreenApi from '../utils/FullScreenApi';
import isFunction from '../utils';

const AUDIO_EXTENSIONS = /\.(mp3|wav)($|\?)/;
const HLS_EXTENSIONS = /\.(m3u8)($|\?)/;

const EVENTS = [
  'onAbort',
  'onCanPlay',
  'onCanPlayThrough',
  'onDurationChange',
  'onEmptied',
  'onEncrypted',
  'onEnded',
  'onError',
  'onLoadedData',
  'onLoadedMetadata',
  'onLoadStart',
  'onPause',
  'onPlay',
  'onPlaying',
  'onProgress',
  'onRateChange',
  'onSeeked',
  'onSeeking',
  'onStalled',
  'onSuspend',
  'onTimeUpdate',
  'onVolumeChange',
  'onWaiting',
];
const STATE_FRESH_INTERVAL = 300;

export default class Hydeo extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props, ...args) {
    super(props, ...args);
    this.renderChildren = this.renderChildren.bind(this);
  }

  componentWillMount() {
    this.updateState = throttle(this.updateState, STATE_FRESH_INTERVAL).bind(this);

    this.mediaEventProps = EVENTS.reduce((eventMap, current) => {
      const eventProps = eventMap;
      eventProps[current] = () => {
        if (current in this.props && isFunction(this.props[current])) {
          this.props[current].call();
        }
        this.updateState();
      };
      return eventProps;
    }, {});
  }

  componentDidMount() {
    const media = this.refs.media;
    if (HLS_EXTENSIONS.test(this.props.src) && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.props.src);
      hls.attachMedia(media);
      // hls.on(Hls.Events.MANIFEST_PARSED, () => media.play());
    }
  }

  setVolume(volume) {
    this.refs.media.volume = volume;
  }

  play() {
    this.refs.media.play();
  }

  pause() {
    this.refs.media.pause();
  }

  togglePlay() {
    if (this.state.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  mute() {
    this.refs.media.muted = true;
  }

  unmute() {
    this.refs.media.muted = false;
  }

  toggleMute() {
    if (this.state.muted) {
      this.unmute();
    } else {
      this.mute();
    }
  }

  seek(time) {
    this.refs.media.currentTime = time;
  }

  requestFullScreen() {
    FullScreenApi.request(this.refs.hydeo);
    this.setState({ isFullScreen: true });
  }

  exitFullScreen() {
    FullScreenApi.exit();
    this.setState({ isFullScreen: false });
  }

  toggleFullScreen() {
    if (this.state.isFullScreen) {
      this.exitFullScreen();
    } else {
      this.requestFullScreen();
    }
  }

  updateState() {
    const media = this.refs.media;
    const duration = media.duration;
    const currentTime = media.currentTime;
    const buffered = media.buffered;

    this.setState({
      totalTime: duration,
      currentTime,
      buffered,
      paused: media.paused,
      muted: media.muted,
      volume: media.volume,
      isFullScreen: FullScreenApi.isFullScreen,
      percentageBuffered: buffered.length && buffered.end(buffered.length - 1) / duration * 100,
      percentagePlayed: currentTime / duration * 100,
    });
  }

  renderChildren() {
    const extendedProps = Object.assign({
      play: this.play,
      pause: this.pause,
      togglePlay: this.togglePlay,
      mute: this.mute,
      unmute: this.unmute,
      setVolume: this.setVolume,
      toggleVolume: this.toggleVolume,
      requestFullScreen: this.requestFullScreen,
      exitFullScreen: this.exitFullScreen,
      toggleFullScreen: this.toggleFullScreen,
    }, this.state);

    return Children.map(this.props.children, (child) => cloneElement(child, extendedProps));
  }

  render() {
    const Media = AUDIO_EXTENSIONS.test(this.props.src) ? 'audio' : 'video';

    return (
      <div refs="hydeo">
        <Media ref="media" {...this.props} { ...this.mediaEventProps } />
        { this.renderChildren() }
      </div>
    );
  }
}
