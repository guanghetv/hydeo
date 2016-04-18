import React, { Component } from 'react';
import { propTypes, defaultProps } from '../props';
import Media from './Media';
import MediaPlayer from '../MediaPlayer';

export default class Hydeo extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props, ...args) {
    super(props, ...args);
    this.ready = this.ready.bind(this);
  }

  ready(element) {
    const media = this.refs.media.refs.media;
    this.media = new MediaPlayer(element, media, this.props);
    this.props.onReady(this.media);
  }

  render() {
    return (
      <div ref={ this.ready }>
        <Media ref="media" { ...Object.assign({}, this.props, { children: null }) } />
        { this.props.children }
      </div>
    );
  }
}
