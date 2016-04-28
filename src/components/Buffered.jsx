import React, { Component, cloneElement, Children } from 'react';
import { propTypes, defaultProps } from '../props';
import { contextTypes } from '../context';

export default class Loaded extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static contextTypes = contextTypes;

  render() {
    const props = Object.assign({
      style: { width: `${this.context.percentageBuffered}%` },
    }, this.props, { children: null });

    if (this.props.children) {
      return cloneElement(Children.only(this.props.children), props);
    }

    return <div {...props} />;
  }

}
