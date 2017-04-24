import React from 'react';
import renderer from 'react-test-renderer';

import Hydeo from '../../src/components/hydeo';

describe('Hydeo component renders the hydeo correctly', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(
      <Hydeo />,
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
