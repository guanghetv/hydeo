import React, { Component, PropTypes } from 'react';
import { propTypes, defaultProps } from '../props';
import PlayControl from './PlayControl';
import FullScreen from './FullScreen';

export default class ControlBar extends Component {

  static propTypes = Object.assign({}, propTypes, { media: PropTypes.object.isRequired });
  static defaultProps = defaultProps;

  render() {
    return (
      <div>
        <PlayControl { ...this.props } />
        <FullScreen { ...this.props } />
      </div>
    );
  }

}
