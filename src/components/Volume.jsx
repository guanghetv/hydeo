import React, { Component, cloneElement, Children } from 'react';
import { propTypes, defaultProps } from '../props';

export default class Volume extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props, ...args) {
    super(props, ...args);
    this.toggleVolume = this.toggleVolume.bind(this);
  }

  toggleVolume() {
    this.props.media.toggleVolume();
  }

  render() {
    return (
      <button onClick={ this.toggleVolume }></button>
    );
  }

}
