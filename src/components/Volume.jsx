import React, { Component } from 'react';
import { propTypes, defaultProps } from '../props';

export default class Volume extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props, ...args) {
    super(props, ...args);
    this.toggleVolume = this.toggleVolume.bind(this);
  }

  state = {
    isMuted: false,
  }

  componentDidMount() {
    this.props.media.onVolumeChange((currentVolume, isMuted) => {
      this.setState({ isMuted });
    });
  }

  toggleVolume() {
    this.props.media.toggleVolume();
  }

  render() {
    const className = this.state.isMuted ? 'muted' : 'sound';
    return (
      <button className={ className } onClick={ this.toggleVolume }></button>
    );
  }

}
