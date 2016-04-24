import { Component, cloneElement, Children } from 'react';
import { propTypes, defaultProps } from '../props';

export default class Play extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  render() {
    return cloneElement(Children.only(this.props.children), {
      className: this.props.paused ? 'play' : 'pause',
      onClick: this.props.togglePlay,
    });
  }

}
