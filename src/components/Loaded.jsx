import { Component, cloneElement, Children } from 'react';
import { propTypes, defaultProps } from '../props';
import { contextTypes } from '../context';

export default class Loaded extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static contextTypes = contextTypes;

  render() {
    return cloneElement(Children.only(this.props.children), {
      style: { width: `${this.context.percentageBuffered}%` },
    });
  }

}
