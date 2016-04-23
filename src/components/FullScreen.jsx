import { Component, PropTypes, cloneElement, Children } from 'react';
import { propTypes, defaultProps } from '../props';

export default class FullScreen extends Component {

  static propTypes = {
    ...propTypes,
    media: PropTypes.object.isRequired,
  };
  static defaultProps = defaultProps;

  constructor(props, ...args) {
    super(props, ...args);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
  }

  state = {
    isFullScreen: false,
  };

  componentDidMount() {
    this.props.media.onFullScreenChange((isFullScreen) => this.setState({ isFullScreen }));
  }

  toggleFullScreen() {
    this.props.media.toggleFullScreen();
    this.setState({ isFullScreen: !this.state.isFullScreen });
  }

  render() {
    return cloneElement(Children.only(this.props.children), {
      className: this.state.isFullScreen ? 'exit' : 'enter',
      onClick: this.toggleFullScreen,
    });
  }

}
