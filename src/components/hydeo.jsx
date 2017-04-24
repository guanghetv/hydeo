import React, { PureComponent } from 'react';

type Props = {
  children: Element,
}

export default class Hydeo extends PureComponent {

  defaultProps = {}
  props: Props

  render() {
    return (
      <div>
        Hydeo
        {this.props.children}
      </div>
    );
  }

}
