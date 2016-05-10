# Hydeo [![Build Status](https://travis-ci.org/centsent/hydeo.svg?branch=master)](https://travis-ci.org/centsent/hydeo)

Hydeo is an html5 video player based on [react](https://facebook.github.io/react).

## Installation

```bash
  $ npm install --save-dev hydeo
```

## Getting started

```javascript
import { Hydeo, Controls, Play, Sound, Fullscreen, Progress, Played, Buffered } from 'hydeo';
render() {
    return (
        <Hydeo autoPlay src="http://www.streambox.fr/playlists/x36xhzz/x36xhzz.m3u8">
            <Controls className="control-bar" >
                <Play />
                <Sound />
                <FullScreen />
                <Progress>
                    <Played />
                    <Buffered />
                </Progress>
            </Controls>
        </Hydeo>
    );
}
```
