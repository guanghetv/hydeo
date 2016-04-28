import { Component, cloneElement, Children } from 'react';
import { propTypes, defaultProps } from '../props';
import { contextTypes } from '../context';
import { isFunction } from '../utils';

export default class Play extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static contextTypes = contextTypes;

  render() {
    const children = this.props.children;
    const originClass = this.props.className;
    let className = this.context.paused ? 'play' : 'pause';

    if (originClass) {
      className += ` ${originClass}`;
    }

    return cloneElement(Children.only(children), {
      className,
      onClick: () => {
        this.context.togglePlay();

        if (isFunction(this.props.onClick)) {
          this.props.onClick();
        }
      },
    });
  }

}
