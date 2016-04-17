import React, { Component } from 'react';
import { propTypes, defaultProps } from '../props';
import MediaPlayer from './MediaPlayer.jsx';

export default class Hydeo extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  render() {
    return (
      <div>
        <MediaPlayer {...this.props} />
      </div>
    );
  }
}
