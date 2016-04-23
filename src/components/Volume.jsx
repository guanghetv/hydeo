import { Component, PropTypes, cloneElement, Children } from 'react';
import { propTypes, defaultProps } from '../props';

export default class Volume extends Component {

  static propTypes = {
    ...propTypes,
    media: PropTypes.object.isRequired,
  };

  static defaultProps = defaultProps;

  constructor(props, ...args) {
    super(props, ...args);
    this.toggleVolume = this.toggleVolume.bind(this);
  }

  state = {
    isMuted: false,
  };

  componentDidMount() {
    this.props.media.onVolumeChange((currentVolume, isMuted) => {
      this.setState({ isMuted });
    });
  }

  toggleVolume() {
    this.props.media.toggleVolume();
  }

  render() {
    return cloneElement(Children.only(this.props.children), {
      className: this.state.isMuted ? 'muted' : 'sound',
      onClick: this.toggleVolume,
    });
  }

}
