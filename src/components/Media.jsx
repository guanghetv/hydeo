import React, { Component } from 'react';
import Hls from 'hls.js';
import { propTypes, defaultProps } from '../props';

const AUDIO_EXTENSIONS = /\.(mp3|wav)($|\?)/;
const HLS_EXTENSIONS = /\.(m3u8)($|\?)/;

export default class Media extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props, ...args) {
    super(props, ...args);
    this.togglePlay = this.togglePlay.bind(this);
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

  togglePlay() {
    const media = this.refs.media;
    if (media.paused) {
      media.play();
    } else {
      media.pause();
    }
  }

  render() {
    const Player = AUDIO_EXTENSIONS.test(this.props.src) ? 'audio' : 'video';
    return <Player ref="media" { ...this.props } onClick={ this.togglePlay } />;
  }
}
