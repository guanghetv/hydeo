import { Hydeo, Play, Sound, FullScreen, PlayProgress, LoadProgress } from 'hydeo';
import React from 'react';
import { render } from 'react-dom';
import './main.scss';

function Demo() {
  return (
    <div className="container">
      <Hydeo src="http://pchls.media.yangcong345.com/pcL_566989c0c41b293c7f4a04c7.m3u8">
        <Play><button className="another-class md-primary" /></Play>
        <Sound><button /></Sound>
        <FullScreen><button /></FullScreen>
        <PlayProgress><div className="play-progress" /></PlayProgress>
        <LoadProgress><div className="load-progress" /></LoadProgress>
      </Hydeo>
    </div>
  );
}

render(<Demo />, document.getElementById('hydeo'));
