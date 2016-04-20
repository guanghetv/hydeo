import React, { Component, PropTypes } from 'react';
import { propTypes, defaultProps } from '../props';

export default class ControlBar extends Component {

  static propTypes = Object.assign({}, propTypes, { media: PropTypes.object.isRequired });
  static defaultProps = defaultProps;

  constructor(props, ...args) {
    super(props, ...args);
    this.state = { show: true };
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.flag = false;
  }

  componentDidMount() {
    const container = this.props.media.container;

    container.addEventListener('mousemove', this.show);
    container.addEventListener('click', this.show);
    container.addEventListener('mouseleave', this.hide);

    this.timeout = setTimeout(this.hide, this.props.autohideTime);
  }

  onMouseEnter() {
    this.flag = true;
    clearTimeout(this.timeout);
  }

  onMouseLeave() {
    this.flag = false;
  }

  hide() {
    this.setState({ show: false });
  }

  show() {
    if (!this.flag) {
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
      <div className="control-bar"
        style={ style }
        onMouseEnter={ this.onMouseEnter }
        onMouseLeave={ this.onMouseLeave }
      >
        { this.props.children }
      </div>
    );
  }

}
