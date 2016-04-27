import React, { Component, Children, cloneElement } from 'react';
import { propTypes, defaultProps } from '../props';
import { contextTypes } from '../context';

export default class ProgressBar extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static contextTypes = contextTypes;

  constructor(props, ...args) {
    super(props, ...args);
    this.renderChild = this.renderChild.bind(this);
  }

  renderChild(child) {
    return cloneElement(child, this.props);
  }

  render() {
    return (
      <div className="progress-bar">
        { Children.map(this.props.children, this.renderChild) }
      </div>
    );
  }
}
