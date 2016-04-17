import React, { Component } from 'react';
import { propTypes, defaultProps } from '../props';
import Media from './Media.jsx';

export default class Hydeo extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  render() {
    return (
      <div>
        <Media {...this.props} />
      </div>
    );
  }
}
