import { Hydeo } from 'hydeo';
import React from 'react';
import { render } from 'react-dom';
import './main.scss';

function Demo() {
  return (
    <div className="container">
      <Hydeo src="http://pchls.media.yangcong345.com/pcL_566989c0c41b293c7f4a04c7.m3u8" />
    </div>
  );
}

render(<Demo />, document.getElementById('hydeo'));
