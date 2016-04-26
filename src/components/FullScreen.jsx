import { Component, cloneElement, Children } from 'react';
import { propTypes, defaultProps } from '../props';

export default class FullScreen extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  render() {
    const children = this.props.children;
    const className = `${children.className} ${this.props.isFullScreen ? 'exit' : 'enter'}`;

    return cloneElement(Children.only(children), {
      className,
      onClick: this.props.toggleFullScreen,
    });
  }

}
