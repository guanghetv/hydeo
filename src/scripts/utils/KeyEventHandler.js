/**
 * @author centsent
 */
const KEY_MAP = {
  13: 'enter',
  32: 'space',
  37: 'left',
  39: 'right'
};

class KeyEventHandler {

  static bind(element, $hyOptions, $hyMedia) {
    this.element = element;
    this.$hyOptions = $hyOptions;
    this.$hyMedia = $hyMedia;

    element.bind('keydown', (event) => {
      const code = event.which;
      const handler = this[KEY_MAP[code]];

      if (handler && (typeof handler === 'function')) {
        handler.call(this);
      }
    });
  }

  static left() {
    const $hyMedia = this.$hyMedia;
    const currentTime = $hyMedia.currentTime;

    // TODO 10 should be a configurable constant.
    $hyMedia.seek(currentTime - 10);
  }

  static right() {
    const $hyMedia = this.$hyMedia;
    const currentTime = $hyMedia.currentTime;

    // TODO 10 should be a configurable constant.
    $hyMedia.seek(currentTime + 10);
  }

  static space() {
    this.$hyMedia.togglePlay();
  }

  static enter() {
    this.$hyMedia.togglePlay();
  }

}

export default KeyEventHandler;
