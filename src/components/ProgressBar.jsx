import React, { Component, PropTypes, Children, cloneElement } from 'react';
import { propTypes, defaultProps } from '../props';

export default class ProgressBar extends Component {

  static propTypes = {
    ...propTypes,
    media: PropTypes.object.isRequired,
  };
  static defaultProps = defaultProps;

  constructor(props, ...args) {
    super(props, ...args);
    this.seek = this.seek.bind(this);
    this.renderChild = this.renderChild.bind(this);
  }

  state = { isReady: false };

  componentDidMount() {
    this.setState({ isReady: true });
  }

  seek(event) {
    const media = this.props.media;
    const width = this.refs.bar.offsetWidth;
    const x = event.nativeEvent.offsetX;
    const time = x / width * media.totalTime;
    media.seek(time);
  }

  renderChild(child, ref) {
    return cloneElement(child, {
      ref,
      getParent: () => this.refs.bar,
    });
  }

  render() {
    return (
      <div ref="bar"
        className="progress-bar"
        onClick={ this.seek }
      >
        { this.state.isReady && Children.map(this.props.children, this.renderChild) }
      </div>
    );
  }
}
