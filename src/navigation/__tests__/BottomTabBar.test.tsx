jest.mock('../../components/Theme');

import React from 'react';
import renderer from 'react-test-renderer';
import BottomTabBar, { HEIGHT as HEADER_HEIGHT } from '../BottomTabBar';

describe('BottomTabBar', () => {

  it('useHeight', () => {
    let consumedHeight;
    function ReadHeight() {
      consumedHeight = BottomTabBar.useHeight({safe: false});
      return null;
    }
    renderer.create(
      <ReadHeight/>
    );
    expect(consumedHeight).toBe(HEADER_HEIGHT);
  });

  it('<ScrollSpacer />', () => {
    const tree = renderer.create(
      <BottomTabBar.ScrollSpacer/>
    );
    expect(tree).toMatchSnapshot();
  });

});
