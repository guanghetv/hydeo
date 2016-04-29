import React, { Component } from 'react';
import { propTypes, defaultProps } from '../props';
import { contextTypes } from '../context';
import Hls from 'hls.js';
import FullScreenApi from '../utils/FullScreenApi';
import { isFunction, throttle } from '../utils';
import { MouseEvents, MediaEvents } from '../utils/Events';

const AUDIO_EXTENSIONS = /\.(mp3|wav)($|\?)/;
const HLS_EXTENSIONS = /\.(m3u8)($|\?)/;
const DECIMAL = 10;
const EVENT_INTERVAL = 300;
const KEY_MAP = {
  13: 'enterKey',
  32: 'spaceKey',
  37: 'leftKey',
  39: 'rightKey',
};

export default class Hydeo extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static childContextTypes = contextTypes;

  constructor(props, ...args) {
    super(props, ...args);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.mute = this.mute.bind(this);
    this.unmute = this.unmute.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.requestFullScreen = this.requestFullScreen.bind(this);
    this.exitFullScreen = this.exitFullScreen.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
    this.toggleVolume = this.toggleVolume.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.seek = this.seek.bind(this);
    this.getMediaState = this.getMediaState.bind(this);
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
    this.on = this.on.bind(this);

    this.eventQueue = [];
  }

  getChildContext() {
    return Object.assign({}, {
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
      seek: this.seek,
      on: this.on,
    }, this.state);
  }

  componentWillMount() {
    this.updateState = throttle(this.updateState, EVENT_INTERVAL).bind(this);
    // this.dispatchEvent = throttle(this.dispatchEvent, EVENT_INTERVAL).bind(this);

    this.mediaEventProps = MediaEvents.reduce((eventMap, currentEvent) => {
      const eventProps = eventMap;
      eventProps[currentEvent] = (event) => {
        if (currentEvent in this.props && isFunction(this.props[currentEvent])) {
          this.props[currentEvent](event);
        }

        if (currentEvent in this && isFunction(this[currentEvent])) {
          this[currentEvent].call(this, event);
        }

        this.updateState();
      };
      return eventProps;
    }, {});

    this.mouseEvents = MouseEvents.reduce((eventMap, currentEvent) => {
      const eventProps = eventMap;

      eventProps[currentEvent] = (event) => {
        this.dispatchEvent(event.nativeEvent || event);
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

    this.props.onReady(Object.assign({}, this.getChildContext(), {
      getMediaState: this.getMediaState,
    }));
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

  getMediaState() {
    return this.state;
  }

  setVolume(volume) {
    this.refs.media.volume = volume;
  }

  dispatchEvent(event) {
    this.eventQueue.forEach((item) => {
      const handler = item[event.type];
      if (isFunction(handler)) {
        handler(event);
      }
    });
  }

  on(eventType, handler) {
    this.eventQueue.push({ [eventType]: handler });
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
    if (!media) return;
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

  handleKeyEvent(event) {
    const code = event.which;
    const handler = this[KEY_MAP[code]];

    if (isFunction(handler)) {
      handler.call(this);
    }
  }

  leftKey() {
    this.seek(this.state.currentTime - 10);
  }

  rightKey() {
    this.seek(this.state.currentTime + 10);
  }

  spaceKey() {
    this.togglePlay();
  }

  enterKey() {
    this.togglePlay();
  }

  render() {
    const Media = AUDIO_EXTENSIONS.test(this.props.src) ? 'audio' : 'video';
    const mediaProps = Object.assign({}, this.props, this.mediaEventProps, { children: null });
    const filledStyle = {
      width: '100%',
      height: '100%',
      outline: 'none',
    };

    return (
      <div ref="hydeo"
        style={ filledStyle }
        tabIndex="-1"
        onKeyDown={ this.handleKeyEvent }
        { ...this.mouseEvents }
      >
        <Media style={ filledStyle } ref="media" { ...mediaProps } onClick={ this.togglePlay } />
        { this.props.children }
      </div>
    );
  }
}
