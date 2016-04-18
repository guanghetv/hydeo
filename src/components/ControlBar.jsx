import React, { Component, PropTypes } from 'react';
import { propTypes, defaultProps } from '../props';

export default class ControlBar extends Component {

  static propTypes = Object.assign({}, propTypes, { media: PropTypes.object.isRequired });
  static defaultProps = defaultProps;

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }

}
