import React, { Component, PropTypes } from 'react';
import { propTypes, defaultProps } from '../props';
import { contextTypes } from '../context';
import FullScreenApi from '../utils/FullScreenApi';
import { isFunction, throttle } from '../utils';
import { MouseEvents, MediaEvents } from '../utils/Events';
import MediaPlayer from '../MediaPlayer';

const AUDIO_EXTENSIONS = /\.(mp3|wav)($|\?)/;
const DECIMAL = 10;
const EVENT_INTERVAL = 300;
const KEY_MAP = {
  13: 'enterKey',
  32: 'spaceKey',
  37: 'leftKey',
  39: 'rightKey',
};

export default class Hydeo extends Component {

  static propTypes = {
    ...propTypes,
    src: PropTypes.string.isRequired,
  };
  static defaultProps = defaultProps;
  static childContextTypes = contextTypes;

  constructor(props, ...args) {
    super(props, ...args);
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
    this.on = this.on.bind(this);

    this.eventQueue = [];
    this.state = {};
  }

  getChildContext() {
    return Object.assign({}, {
      on: this.on,
    }, this.state);
  }

  componentWillMount() {
    this.updateState = throttle(this.updateState, EVENT_INTERVAL).bind(this);

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
    const container = this.refs.hydeo;

    FullScreenApi.onChange(container, () => {
      const isFullScreen = FullScreenApi.isFullScreen();
      this.setState({ isFullScreen });
    });

    this.controller = new MediaPlayer(media, container);
    this.controller.changeSource(this.props.src);
    this.props.onReady(this.controller);
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

  updateState() {
    if (!this.controller) return;
    this.controller._update();
    const controller = {};
    const properties = Object.getOwnPropertyNames(MediaPlayer.prototype)
      .concat(Object.keys(this.controller));

    // Do not map the constructor & private function/property(start with '_')
    properties.forEach((prop) => {
      if (prop === 'constructor' || prop.startsWith('_')) return;
      controller[prop] = this.controller[prop];
    });

    this.setState({ ...controller });
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
        <Media style={ filledStyle }
          ref="media"
          onClick={ this.state.togglePlay }
          { ...mediaProps }
        />

        { this.props.children }
      </div>
    );
  }
}
