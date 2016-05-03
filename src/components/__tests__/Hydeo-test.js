import React from 'react';
import {
  shallow,
  mount,
  render,
} from 'enzyme';
import Hydeo from '../Hydeo.jsx';

jest.dontMock('../Hydeo.jsx');

describe('<Hydeo />', function() {
  it('contains spec with an expectation', function() {
    const wrapper = mount(<Hydeo />);
    expect(wrapper.props().autoPlay).toBe(false);
  });
});
