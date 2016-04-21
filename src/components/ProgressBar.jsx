import React, { Component } from 'react';
import { propTypes, defaultProps } from '../props';

export default class ProgressBar extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      pointStyle: null,
      playProgressStyle: null,
      loadProgressStyle: null,
    };
    this.seek = this.seek.bind(this);
  }

  componentDidMount() {
    const media = this.props.media;
    const bar = this.refs.bar;
    const point = this.refs.point;
    const barWidth = bar.clientWidth;
    const pointWidth = point.clientWidth;

    media.onTimeUpdate((currentTime) => {
      const totalTime = media.totalTime;
      const extraTotal = totalTime + totalTime / barWidth * pointWidth;
      const left = `${currentTime / extraTotal * 100}%`;
      const percentTime = currentTime / totalTime * 100;
      this.setState({
        pointStyle: { left },
        playProgressStyle: { width: `${percentTime}%` },
      });
    });

    media.onProgress((buffered, bufferedEnd, totalTime) => {
      const percentTime = bufferedEnd / totalTime * 100;
      this.setState({ loadProgressStyle: { width: `${percentTime}%` } });
    });
  }

  seek(event) {
    const media = this.props.media;
    const width = this.refs.bar.offsetWidth;
    const x = event.nativeEvent.offsetX;
    const time = x / width * media.totalTime;
    media.seek(time);
  }

  render() {
    return (
      <div ref="bar"
        className="progress-bar"
        onClick={ this.seek }
      >
        <div className="load-progress" style={ this.state.loadProgressStyle }></div>
        <div className="play-progress" style={ this.state.playProgressStyle }></div>
        <div ref="point"
          className="time-point"
          style={ this.state.pointStyle }
          onClick={ (event) => event.stopPropagation() }
          onMouseMove={ (event) => event.stopPropagation() }
        ></div>
      </div>
    );
  }
}
