import React, { Component } from 'react';
import { propTypes, defaultProps } from '../props';
import { contextTypes } from '../context';

export default class Controls extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static contextTypes = contextTypes;

  constructor(props, ...args) {
    super(props, ...args);
    this.state = { show: true };
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.isInsideBar = false;
  }

  componentDidMount() {
    if (this.props.autohide) {
      this.context.on('mousemove', this.show);
      this.context.on('click', this.show);
      this.context.on('mouseleave', this.hide);
      this.timeout = setTimeout(this.hide, this.props.autohideTime);
    }
  }

  onMouseEnter() {
    this.isInsideBar = true;
    clearTimeout(this.timeout);
  }

  hide() {
    this.isInsideBar = false;
    this.setState({ show: false });
  }

  show() {
    if (!this.isInsideBar) {
      clearTimeout(this.timeout);
      this.setState({ show: true });
      this.timeout = setTimeout(this.hide, this.props.autohideTime);
    }
  }

  render() {
    const style = {
      display: this.state.show ? 'block' : 'none',
    };

    return (
      <div
        { ...this.props }
        style={ style }
        onMouseEnter={ this.onMouseEnter }
        onMouseLeave={ this.hide }
      >
        { this.props.children }
      </div>
    );
  }

}
