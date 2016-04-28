import {
  Hydeo,
  Play,
  Sound,
  FullScreen,
  Played,
  Loaded,
  Controls,
  Progress,
  Scrubber,
} from 'hydeo';
import React from 'react';
import { render } from 'react-dom';
import './main.scss';

function Demo() {
  return (
    <div className="container">
      <Hydeo src="http://pchls.media.yangcong345.com/pcL_566989c0c41b293c7f4a04c7.m3u8">
        <div>
          <Controls>
            <Play><button className="another-class md-primary" /></Play>
            <Sound><button /></Sound>
            <FullScreen><button /></FullScreen>
            <Progress>
              <Played><div className="play-progress" /></Played>
              <Loaded><div className="load-progress" /></Loaded>
              <Scrubber className="time-point" />
            </Progress>
          </Controls>
        </div>
      </Hydeo>
    </div>
  );
}

render(<Demo />, document.getElementById('hydeo'));
