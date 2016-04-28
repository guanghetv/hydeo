import React, { Component, cloneElement, Children } from 'react';
import { propTypes, defaultProps } from '../props';
import { contextTypes } from '../context';

export default class Scrubber extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static contextTypes = contextTypes;

  render() {
    const style = { left: `${this.context.percentagePlayed}%` };
    const props = Object.assign({
      style,
      onClick: (event) => event.stopPropagation(),
    }, this.props, { children: null });

    if (this.props.children) {
      return cloneElement(Children.only(this.props.children), props);
    }

    return <span { ...props } />;
  }

}
