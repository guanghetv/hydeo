import React, { Component, Children, cloneElement } from 'react';
import { propTypes, defaultProps } from '../props';
import Hls from 'hls.js';

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

export default class Hydeo extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props, ...args) {
    super(props, ...args);
    this.renderChildren = this.renderChildren.bind(this);
  }

  componentWillMount() {
    this.mediaEventProps = EVENTS.reduce((eventMap, current) => {
      const eventProps = eventMap;
      eventProps[current] = this[current];
      return eventProps;
    }, {});
  }

  componentDidMount() {
    const media = this.mediaElement;
    if (HLS_EXTENSIONS.test(this.props.src) && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.props.src);
      hls.attachMedia(media);
      // hls.on(Hls.Events.MANIFEST_PARSED, () => media.play());
    }
  }

  renderChildren() {
    return Children.map(this.props.children, (child, ref) => cloneElement(child, { ref }));
  }

  render() {
    const Media = AUDIO_EXTENSIONS.test(this.props.src) ? 'audio' : 'video';


    return (
      <div>
        <Media ref={ (el) => (this.mediaElement = el) } {...this.props} />
        { this.renderChildren() }
      </div>
    );
  }
}
