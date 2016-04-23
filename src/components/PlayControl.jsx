import { Component, PropTypes, cloneElement, Children } from 'react';
import { propTypes, defaultProps } from '../props';

export default class PlayControl extends Component {

  static propTypes = {
    ...propTypes,
    media: PropTypes.object.isRequired,
  };
  static defaultProps = defaultProps;

  constructor(props, ...args) {
    super(props, ...args);
    this.togglePlay = this.togglePlay.bind(this);
  }

  state = {
    isPlaying: false,
  };

  componentDidMount() {
    this.props.media.onPlay(() => this.setState({ isPlaying: true }));
    this.props.media.onPause(() => this.setState({ isPlaying: false }));
  }

  togglePlay() {
    this.props.media.togglePlay();
    this.setState({ isPlaying: !this.state.isPlaying });
  }

  render() {
    return cloneElement(Children.only(this.props.children), {
      className: this.state.isPlaying ? 'pause' : 'play',
      onClick: this.togglePlay,
    });
  }

}
