import React from 'react';
import { shallow, mount } from 'enzyme';

import Hydeo from '../../src/components/hydeo';

describe('hydeo', () => {
  it('renders without crashing', () => {
    mount(<Hydeo />);
  });

  it('should render the hydeo', () => {
    const wrapper = shallow(<Hydeo />);
    const context = <div>Hydeo</div>;

    expect(wrapper.contains(context)).toEqual(true);
  });
});
