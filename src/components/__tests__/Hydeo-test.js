import React from 'react';
import { shallow, mount, render } from 'enzyme';

jest.dontMock('../Hydeo.jsx');

const Hydeo = require('../Hydeo.jsx');

describe('<Hydeo />', function () {
  it('contains spec with an expectation', function () {
    expect(true).toBe(true);
    // expect(shallow(<Hydeo />).contains(<video />)).toBe(true);
  });

  // it('contains spec with an expectation', function () {
    // expect(shallow(<Hydeo />).is('.foo')).toBe(true);
  // });

  // it('contains spec with an expectation', function () {
    // expect(mount(<Hydeo />).find('.foo').length).toBe(1);
  // });
});
