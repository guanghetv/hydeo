import { Hydeo, PlayControl, FullScreen, ControlBar } from 'hydeo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import './main.scss';

class Demo extends Component {

  constructor(props, ...args) {
    super(props, ...args);
    this.state = { media: null };
    this.onReady = this.onReady.bind(this);
  }

  onReady(media) {
    this.setState({ media });
  }

  render() {
    return (
      <div className="container">
        <Hydeo src="http://pchls.media.yangcong345.com/pcL_566989c0c41b293c7f4a04c7.m3u8" onReady={ this.onReady }>
          {
            this.state.media ? (
              <ControlBar media={ this.state.media }>
                <PlayControl media={ this.state.media } />
                <FullScreen media= { this.state.media } />
              </ControlBar>
              ) : ''
          }
        </Hydeo>
      </div>
    );
  }

}

render(<Demo className="container" />, document.getElementById('hydeo'));
