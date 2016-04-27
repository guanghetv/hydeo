import { Component, cloneElement, Children } from 'react';
import { propTypes, defaultProps } from '../props';
import { contextTypes } from '../context';

export default class Play extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static contextTypes = contextTypes;

  render() {
    const children = this.props.children;
    const className = `${children.props.className} ${this.context.paused ? 'play' : 'pause'}`;
    return cloneElement(Children.only(children), {
      className,
      onClick: this.context.togglePlay,
    });
  }

}
