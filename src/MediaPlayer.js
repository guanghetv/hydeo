import FullScreenApi from './utils/FullScreenApi';
import Hls from 'hls.js';

/**
 * Hls format.
 */
const HLS_EXTENSIONS = /\.(m3u8)($|\?)/;
/**
 *
 */
const DEFAULT_AUDIO_CODEC = 'avc1.42E01E, mp4a.40.2';

/**
 * Provide APIs for audio/video.
 */
export default class MediaPlayer {

  constructor(media, container) {
    this.media = media;
    this.container = container;

    this.togglePlay = this.togglePlay.bind(this);
  }

  /**
   * Starts playing the audio/video.
   */
  play() {
    this.media.play();
  }

  /**
   * Pauses the currently playing audio/video.
   */
  pause() {
    this.media.pause();
  }

  /**
   * Play the audio/video if it's paused, else pause it.
   */
  togglePlay() {
    if (this.isPaused) {
      this.play();
    } else {
      this.pause();
    }
  }

  /**
   * Enter full screen mode.
   */
  requestFullScreen() {
    FullScreenApi.request(this.container);
  }

  /**
   * Exit full screen mode.
   */
  exitFullScreen() {
    FullScreenApi.exit();
  }

  /**
   * Enter the full screen mode if not being displayed full-screen, else exit.
   */
  toggleFullScreen() {
    if (this.isFullScreen) {
      this.exitFullScreen();
    } else {
      this.requestFullScreen();
    }
  }

  /**
   * Sets the audio/video is muted.
   */
  mute() {
    this.media.muted = true;
  }

  /**
   * Sets the audio/video to unmute.
   */
  unmute() {
    this.media.muted = false;
  }

  /**
   * Moving/skipping to a new position in the audio/video.
   *
   * @param time {number} A time point in second.
   */
  seek(time) {
    this.media.currentTime = time;
  }

  /**
   * Change the current source of the audio/video element.
   */
  changeSource(source) {
    if (this.media.src !== source) {
      this.media.src = source;
    }

    if (HLS_EXTENSIONS.test(source) && Hls.isSupported()) {
      this._destroyHls();
      const hls = new Hls({
        defaultAudioCodec: DEFAULT_AUDIO_CODEC,
      });
      hls.loadSource(source);
      hls.attachMedia(this.media);
      this._hls = hls;
    }
  }

  /**
   *
   */
  _destroyHls() {
    if (this._hls) this._hls.destroy();
  }

  /**
   * Switch the audio/video to muted whether is not muted or vice verse.
   */
  toggleVolume() {
    if (this.isMuted) {
      this.unmute();
    } else {
      this.mute();
    }
  }

  /**
   * Return `true` if the audio/video is muted, else `false`.
   *
   * @returns {boolean} Returns whether the audio/video is muted or not.
   */
  get isMuted() {
    return this.media.muted;
  }

  /**
   * Change the audio/video volume level.
   *
   * @param volume {number} A number range from 0 to 1.
   *
   */
  set volume(volume) {
    this.media.volume = volume;
  }

  /**
   * Returns the volume of the audio/video.
   */
  get volume() {
    return this.media.volume;
  }

  /**
   * Check whether the audio/video is paused or not.
   *
   * @returns {boolean} Returns `true` for the audio/video is paused, else `false`.
   */
  get isPaused() {
    return this.media.paused;
  }

  /**
   * Check whether the audio/video is on playing or not.
   *
   * @returns {boolean} Returns `true` in case the audio/video is playing, else `false`.
   */
  get isPlayed() {
    return !this.isPaused;
  }

  /**
   *
   */
  get isAutoPlay() {
    return this.media.autoplay;
  }

  /**
   * Determine a user enter/exit the full screen mode.
   */
  get isFullScreen() {
    return FullScreenApi.isFullScreen();
  }

  /**
   * Returns whether the playback of the audio/video has ended or not.
   */
  get isEnded() {
    return this.media.isEnded;
  }

  /**
   *
   */
  get buffered() {
    return this.media.buffered;
  }

  /**
   *
   */
  _update() {
    const media = this.media;
    const buffered = this.buffered;
    const duration = media.duration;

    this.duration = duration;
    this.currentTime = media.currentTime;
    this.percentagePlayed = this.currentTime / this.duration * 100;
    this.percentageBuffered = buffered.length && buffered.end(buffered.length - 1) / duration * 100;
  }

}
