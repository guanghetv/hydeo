import { Component, cloneElement, Children } from 'react';
import { propTypes, defaultProps } from '../props';

export default class Sound extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  render() {
    return cloneElement(Children.only(this.props.children), {
      className: this.props.isMuted ? 'muted' : 'sound',
      onClick: this.props.toggleVolume,
    });
  }

}
