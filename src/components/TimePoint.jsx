import { Component, PropTypes, cloneElement, Children } from 'react';
import { propTypes, defaultProps } from '../props';

export default class TimePoint extends Component {

  static propTypes = {
    ...propTypes,
    media: PropTypes.object.isRequired,
  };
  static defaultProps = defaultProps;

  state = { style: null };

  ref(element) {
    if (element) {
      this.element = element;
    }

    const media = this.props.media;
    const barWidth = this.element.parentElement.clientWidth;
    const pointWidth = this.element.clientWidth;

    media.onTimeUpdate((currentTime) => {
      const totalTime = media.totalTime;
      const extraTotal = totalTime + totalTime / barWidth * pointWidth;
      const left = `${currentTime / extraTotal * 100}%`;
      this.setState({ style: { left } });
    });
  }

  render() {
    return cloneElement(Children.only(this.props.children), {
      style: this.state.style,
      ref: this.ref.bind(this),
      onClick: (event) => event.stopPropagation(),
      onMouseMove: (event) => event.stopPropagation(),
    });
  }

}
