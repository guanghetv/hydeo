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
    this._isMounted = true;

    if (this.props.autohide) {
      const { on } = this.context;
      on('mousemove', this.show);
      on('mouseleave', this.hide);

      this.timeout = setTimeout(this.hide, this.props.autohideTime);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onMouseEnter() {
    if (this.props.autohide && this._isMounted) {
      this.isInsideBar = true;
      clearTimeout(this.timeout);
    }
  }

  hide() {
    if (this.props.autohide && this._isMounted) {
      this.isInsideBar = false;
      this.setState({ show: false });
    }
  }

  show() {
    if (!this.isInsideBar && this.props.autohide && this._isMounted) {
      clearTimeout(this.timeout);
      this.setState({ show: true });
      this.timeout = setTimeout(this.hide, this.props.autohideTime);
    }
  }

  render() {
    const style = {
      ...this.props.style,
      opacity: this.state.show ? 1 : 0,
      bottom: this.state.show ? '12px' : '4px',
    };

    if (this.context.isPaused) {
      style.opacity = 1;
    }

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
