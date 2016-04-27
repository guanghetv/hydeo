import React, { Component, Children, cloneElement } from 'react';
import { propTypes, defaultProps } from '../props';
import Hls from 'hls.js';
import FullScreenApi from '../utils/FullScreenApi';
import { isFunction, throttle } from '../utils';

const AUDIO_EXTENSIONS = /\.(mp3|wav)($|\?)/;
const HLS_EXTENSIONS = /\.(m3u8)($|\?)/;
const DECIMAL = 10;
const STATE_FRESH_INTERVAL = 500;
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

export default class Hydeo extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props, ...args) {
    super(props, ...args);
    this.renderChildren = this.renderChildren.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
  }

  componentWillMount() {
    this.updateState = throttle(this.updateState, STATE_FRESH_INTERVAL).bind(this);

    this.mediaEventProps = EVENTS.reduce((eventMap, currentEvent) => {
      const eventProps = eventMap;
      eventProps[currentEvent] = (event) => {
        if (currentEvent in this.props && isFunction(this.props[currentEvent])) {
          this.props[currentEvent].call(event);
        }

        if (currentEvent in this && isFunction(this[currentEvent])) {
          this[currentEvent].call(this, event);
        }

        this.updateState();
      };
      return eventProps;
    }, {});
  }

  componentDidMount() {
    const media = this.refs.media;
    if (HLS_EXTENSIONS.test(this.props.src) && Hls.isSupported()) {
      const hls = new Hls({ defaultAudioCodec: 'avc1.42E01E, mp4a.40.2' });
      hls.loadSource(this.props.src);
      hls.attachMedia(media);
      // hls.on(Hls.Events.MANIFEST_PARSED, () => media.play());
    }
    FullScreenApi.onChange(this.refs.hydeo, () => {
      const isFullScreen = FullScreenApi.isFullScreen();
      this.setState({ isFullScreen });
    });
  }

  onTimeUpdate(event) {
    const cuepoints = this.props.cuepoints;
    if (!cuepoints) {
      return;
    }

    const currentTime = event.target.currentTime;
    const currentSecond = parseInt(currentTime, DECIMAL);
    cuepoints.forEach((item) => {
      const cuepoint = item;
      const start = parseInt(cuepoint.time, DECIMAL);
      if (currentSecond === start) {
        if (isFunction(cuepoint.onEnter) && !cuepoint.$$isDirty) {
          cuepoint.onEnter(this.currentTime, cuepoint.params);
        }
        cuepoint.$$isDirty = true;
      }

      if (currentSecond > start) {
        if (isFunction(cuepoint.onComplete)) {
          cuepoint.onComplete(this.currentTime, cuepoint.params);
        }
        cuepoint.$$isDirty = false;
      }

      if (currentSecond < start) {
        cuepoint.$$isDirty = false;
      }
    });
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

  toggleVolume() {
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
      percentageBuffered: buffered.length && buffered.end(buffered.length - 1) / duration * 100,
      percentagePlayed: currentTime / duration * 100,
    });
  }

  renderChildren() {
    const extendedProps = Object.assign({
      play: this.play.bind(this),
      pause: this.pause.bind(this),
      togglePlay: this.togglePlay,
      mute: this.mute.bind(this),
      unmute: this.unmute.bind(this),
      setVolume: this.setVolume.bind(this),
      toggleVolume: this.toggleVolume.bind(this),
      requestFullScreen: this.requestFullScreen.bind(this),
      exitFullScreen: this.exitFullScreen.bind(this),
      toggleFullScreen: this.toggleFullScreen.bind(this),
    }, this.state);

    return Children.map(this.props.children, (child) => cloneElement(child, extendedProps));
  }

  render() {
    const Media = AUDIO_EXTENSIONS.test(this.props.src) ? 'audio' : 'video';
    const mediaProps = Object.assign({}, this.props, this.mediaEventProps);

    return (
      <div ref="hydeo"
        onClick={ () => this.setState({})}
        onMouseMove={ () => this.setState({})}
        onMouseLeave={ () => this.setState({})}
      >
        <Media ref="media" { ...mediaProps } onClick={ this.togglePlay } />
        { this.renderChildren() }
      </div>
    );
  }
}
