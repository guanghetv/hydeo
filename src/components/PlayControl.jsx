import React, { Component } from 'react';
import { propTypes, defaultProps } from '../props';

export default class PlayControl extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props, ...args) {
    super(props, ...args);
    this.state = { isPlaying: false };

    this.togglePlay = this.togglePlay.bind(this);
  }

  componentDidMount() {
    this.props.media.onPlay(() => this.setState({ isPlaying: true }));
    this.props.media.onPause(() => this.setState({ isPlaying: false }));
  }

  togglePlay() {
    this.props.media.togglePlay();
    this.setState({ isPlaying: !this.state.isPlaying });
  }

  render() {
    const className = this.state.isPlaying ? 'pause' : 'play';

    return (
      <button className={ className } onClick={this.togglePlay}>{ className }</button>
    );
  }

}
