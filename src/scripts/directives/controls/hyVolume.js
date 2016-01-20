function hyVolume($hyMedia) {
  'ngInject';

  return {
    restrict: 'A',
    link($scope, elem) {
      const bar = document.createElement('ul');
      const levelList = [];
      let barTimeout;
      bar.classList.add('hy-volume-bar');
      elem.after(bar);

      for (let i = 10; i > 0; i--) {
        const li = document.createElement('li');
        const iElem = document.createElement('i');

        li.dataset.level = i * 10;
        li.appendChild(iElem);
        bar.appendChild(li);
        levelList.push(li);
      }

      function setVolumeValue(volume) {
        levelList.map((li) => {
          const level = parseInt(li.dataset.level, 10);

          li.classList.remove('current');

          if (level <= volume) {
            li.classList.add('current');
          }
        });
      }

      levelList.map((li) => {
        li.addEventListener('click', () => {
          const volume = parseInt(li.dataset.level, 10);

          $hyMedia.volume(volume);
        });
      });

      function showBar(event) {
        const target = event.target;
        clearTimeout(barTimeout);
        bar.style.display = 'block';

        if (target === elem[0]) {
          const top = -(bar.offsetHeight - target.offsetHeight);
          const margin = 10;
          bar.style.top = `${top - margin}px`;
        }
      }

      function hideBar() {
        barTimeout = setTimeout(() => bar.style.display = 'none', 500);
      }

      elem.addClass($hyMedia.isMuted ? 'unmuted' : 'muted')
        .on('click', () => $hyMedia.toggleMuted())
        .on('mouseover', showBar)
        .on('mouseout', hideBar);

      bar.addEventListener('mouseover', showBar);
      bar.addEventListener('mouseout', hideBar);

      $hyMedia.onVolumeChange((currentVolume, isMuted) => {
        elem.toggleClass('unmuted', isMuted)
          .toggleClass('muted', !isMuted);

        setVolumeValue(currentVolume);
      });

      setVolumeValue($hyMedia.currentVolume);
    },
  };
}

export default hyVolume;
