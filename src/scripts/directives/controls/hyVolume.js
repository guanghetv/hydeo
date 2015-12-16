/**
 * @author centsent
 */
import directivesModule from '../_index';


const _hyMedia = new WeakMap();

class HyVolume {

  constructor($hyMedia) {
    this.restrict = 'A';
    _hyMedia.set(this, $hyMedia);
  }

  compile() {
    return this.link.bind(this);
  }

  link($scope, elem) {
    const $hyMedia = _hyMedia.get(this);
    const volumeBar = this.addVolumeBar(elem);
    const volumeValue = this.addVolumeValue(volumeBar);
    let barTimeout;

    function showVolumeBar(event, isTarget) {
      clearTimeout(barTimeout);
      volumeBar.style.display = 'block';

      if (isTarget) {
        const top = -(volumeBar.offsetHeight - event.target.offsetHeight);
        // TODO  10 should be a configurable constant.
        const margin = 10;
        volumeBar.style.top = `${top - margin}px`;
      }
    }

    function hideVolumeBar() {
      barTimeout = setTimeout(() => {
        volumeBar.style.display = 'none';
      }, 500);
    }

    elem.addClass($hyMedia.isMuted ? 'unmuted' : 'muted')
      .bind('click', () => $hyMedia.toggleMuted())
      .bind('mouseover', (event) => showVolumeBar(event, true))
      .bind('mouseout', hideVolumeBar);

    volumeBar.addEventListener('click', (event) => {
      const volumeHeight = parseInt(volumeBar.offsetHeight, 10);
      const value = parseInt(100 - event.offsetY / volumeHeight * 100, 10);

      $hyMedia.volume(value);
    });
    volumeBar.addEventListener('mousemove', showVolumeBar);
    volumeBar.addEventListener('mouseout', hideVolumeBar);

    $hyMedia.onVolumeChange((volume, isMuted) => {
      elem.toggleClass('unmuted', isMuted)
        .toggleClass('muted', !isMuted);
      this.setVolumeValue(volume, volumeValue);
    });

    this.setVolumeValue($hyMedia.currentVolume, volumeValue);
  }

  setVolumeValue(value, volumeValue) {
    volumeValue.style.height = `${value}%`;
    volumeValue.style.top = `${100 - value}%`;
  }

  addVolumeValue(volumeBar) {
    const volumeValue = document.createElement('div');

    volumeBar.appendChild(volumeValue);
    volumeValue.classList.add('hy-volume-value');
    volumeValue.style['pointer-events'] = 'none';

    return volumeValue;
  }

  addVolumeBar(elem) {
    const volumeBar = document.createElement('div');

    elem.after(volumeBar);
    volumeBar.classList.add('hy-volume-bar');

    return volumeBar;
  }

  static factory($hyMedia) {
    return new HyVolume($hyMedia);
  }

}

HyVolume.factory.$inject = ['$hyMedia'];

directivesModule.directive('hyVolume', HyVolume.factory);
