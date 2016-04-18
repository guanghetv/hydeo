import Hydeo from './components/Hydeo.jsx';
import React, { Component } from 'react';
import { render } from 'react-dom';
import ControlBar from './components/ControlBar';
import PlayControl from './components/PlayControl';
import FullScreen from './components/FullScreen';

class Demo extends Component {

  constructor(props, ...args) {
    super(props, ...args);
    this.state = { isReady: false };
    this.onReady = this.onReady.bind(this);
  }

  onReady(media) {
    this.media = media;
    this.setState({ isReady: true });
  }

  render() {
    return (
      <Hydeo src="http://pchls.media.yangcong345.com/pcL_566989c0c41b293c7f4a04c7.m3u8" onReady={ this.onReady }>
        {
          (() => {
            if (this.state.isReady) {
              return (
                <ControlBar media={ this.media }>
                  <PlayControl media={ this.media } />
                  <FullScreen media= { this.media } />
                </ControlBar>
                );
            }

            return null;
          })()
        }
      </Hydeo>
    );
  }

}

render(
  <Demo />,
  document.getElementById('hydeo')
);
