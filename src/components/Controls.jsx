import React, { Component, Children, cloneElement } from 'react';
import { propTypes, defaultProps } from '../props';

export default class Controls extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props, ...args) {
    super(props, ...args);
    this.state = { show: true };
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.isInsideBar = false;
    this.renderChildren = this.renderChildren.bind(this);
  }

  // componentDidMount() {
  //   if (this.props.autohide) {
  //     const container = this.props.media.container;
  //
  //     container.addEventListener('mousemove', this.show);
  //     container.addEventListener('click', this.show);
  //     container.addEventListener('mouseleave', this.hide);
  //
  //     this.timeout = setTimeout(this.hide, this.props.autohideTime);
  //   }
  // }

  onMouseEnter() {
    this.isInsideBar = true;
    clearTimeout(this.timeout);
  }

  hide() {
    this.setState({ show: false });
  }

  show() {
    if (!this.isInsideBar) {
      clearTimeout(this.timeout);
      this.setState({ show: true });
      this.timeout = setTimeout(this.hide, this.props.autohideTime);
    }
  }

  renderChildren(child) {
    return cloneElement(child, { ...this.props, children: child.props.children });
  }

  render() {
    const style = {
      display: this.state.show ? 'block' : 'none',
    };

    return (
      <div className="control-bar"
        style={ style }
        onMouseEnter={ this.onMouseEnter }
        onMouseLeave={ () => (this.isInsideBar = false) }
      >
        { Children.map(this.props.children, this.renderChildren) }
      </div>
    );
  }

}
