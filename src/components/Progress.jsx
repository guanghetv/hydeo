import React, { Component } from 'react';
import { propTypes, defaultProps } from '../props';
import { contextTypes } from '../context';

export default class Progress extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static contextTypes = contextTypes;

  constructor(props, ...args) {
    super(props, ...args);
    this.seek = this.seek.bind(this);
  }

  seek(event) {
    const element = this.refs.progress;
    const width = element.offsetWidth;
    const time = event.nativeEvent.offsetX / width * this.context.totalTime;
    this.context.seek(time);
  }

  render() {
    return (
      <div ref="progress" className="progress-bar" onClick={ this.seek }>
        { this.props.children }
      </div>
    );
  }
}
