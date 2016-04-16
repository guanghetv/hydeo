import React, { Component, PropTypes } from 'react';

export default class Hydeo extends Component {

  constructor(props, ...args) {
    super(props, ...args);
    this.state = {};
  }

  render() {
    return (
      <div>
        <video {...this.props} />
      </div>
    );
  }
}

Hydeo.propTypes = {
  src: PropTypes.string,
  autoPlay: PropTypes.bool,
};
