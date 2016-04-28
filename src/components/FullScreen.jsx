import { Component, cloneElement, Children } from 'react';
import { propTypes, defaultProps } from '../props';
import { contextTypes } from '../context';
import { isFunction } from '../utils';

export default class FullScreen extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static contextTypes = contextTypes;

  render() {
    const children = this.props.children;
    const originClass = this.props.className;
    let className = this.context.isFullScreen ? 'exit' : 'enter';

    if (originClass) {
      className += ` ${originClass}`;
    }

    return cloneElement(Children.only(children), {
      className,
      onClick: () => {
        this.context.toggleFullScreen();

        if (isFunction(this.props.onClick)) {
          this.props.onClick();
        }
      },
    });
  }

}
