import { Component, cloneElement, Children } from 'react';
import { propTypes, defaultProps } from '../props';

export default class FullScreen extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  render() {
    return cloneElement(Children.only(this.props.children), {
      className: this.props.isFullScreen ? 'exit' : 'enter',
      onClick: this.props.toggleFullScreen,
    });
  }

}
