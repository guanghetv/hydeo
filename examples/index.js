import { Hydeo, Play, Sound, FullScreen, ProgressBar, PlayProgress, LoadProgress } from 'hydeo';
import React from 'react';
import { render } from 'react-dom';
import './main.scss';

function Demo() {
  return (
    <div className="container">
      <Hydeo src="http://pchls.media.yangcong345.com/pcL_566989c0c41b293c7f4a04c7.m3u8">
        <Play><button /></Play>
        <Sound><button /></Sound>
        <FullScreen><button /></FullScreen>
        <ProgressBar>
          <PlayProgress><div className="play-progress" /></PlayProgress>
        </ProgressBar>
      </Hydeo>
    </div>
  );
}

render(<Demo />, document.getElementById('hydeo'));
