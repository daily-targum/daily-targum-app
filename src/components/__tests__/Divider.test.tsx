jest.mock('../Theme');

import React from 'react';
import Divider from '../Divider';
import { useTheme } from '../Theme';
import renderer from 'react-test-renderer';

describe('<Divider />', () => {

  it('renders correctly', () => {
    const tree = renderer.create(
      <Divider/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('inherits color from theme provider', () => {
    const tree: any = renderer.create(<Divider/>).toJSON();
    expect(tree?.props?.style[0]?.backgroundColor).toBe(useTheme().colors.divider);
  });

});