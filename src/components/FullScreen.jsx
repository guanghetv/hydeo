import React, { Component } from 'react';
import { propTypes, defaultProps } from '../props';

export default class FullScreen extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props, ...args) {
    super(props, ...args);
    this.state = { isFullscreen: false };
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
  }

  componentDidMount() {
    this.props.media.onFullScreenChange((isFullScreen) => this.setState({ isFullScreen }));
  }

  toggleFullScreen() {
    this.props.media.toggleFullScreen();
    this.setState({ isFullScreen: !this.state.isFullScreen });
  }

  render() {
    const className = this.state.isFullScreen ? 'exit' : 'enter';

    return <button className={ className } onClick={this.toggleFullScreen}></button>;
  }

}
