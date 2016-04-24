import { Component, PropTypes, cloneElement, Children } from 'react';
import { propTypes, defaultProps } from '../props';

export default class LoadProgress extends Component {

  static propTypes = {
    ...propTypes,
    media: PropTypes.object.isRequired,
  };
  static defaultProps = defaultProps;

  state = { style: null };

  componentDidMount() {
    const media = this.props.media;
    media.onProgress(() => {
      const percentTime = media.bufferedEnd / media.totalTime * 100;
      const style = { width: `${percentTime}%` };
      this.setState({ style });
    });
  }

  render() {
    return cloneElement(Children.only(this.props.children), {
      style: this.state.style,
    });
  }

}
