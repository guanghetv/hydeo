import React, { Component, PropTypes } from 'react';
import Hls from 'hls.js';

const HLS_FORMAT = '.m3u8';

export default class Hydeo extends Component {

  constructor(props, ...args) {
    super(props, ...args);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.src.endsWith(HLS_FORMAT) && Hls.isSupported()) {
      const video = this.refs.media;
      const hls = new Hls();
      hls.loadSource(this.props.src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
    }
  }

  render() {
    return (
      <div>
        <video ref="media" {...this.props} />
      </div>
    );
  }
}

Hydeo.propTypes = {
  src: PropTypes.string.isRequired,
  autoPlay: PropTypes.bool,
};
