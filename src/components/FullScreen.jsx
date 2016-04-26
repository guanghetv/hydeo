import { Component, cloneElement, Children } from 'react';
import { propTypes, defaultProps } from '../props';
import classNames from 'classnames';

export default class FullScreen extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  render() {
    const children = this.props.children;
    const className = classNames(children.className, this.props.isFullScreen ? 'exit' : 'enter');

    return cloneElement(Children.only(children), {
      className,
      onClick: this.props.toggleFullScreen,
    });
  }

}
