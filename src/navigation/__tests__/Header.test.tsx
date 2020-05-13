jest.mock('../../navigation', () => ({
  Drawer: {
    Button: () => null
  }
}));

jest.mock('../../components/Theme');

import React from 'react';
import renderer from 'react-test-renderer';
import Header, { HEIGHT as HEADER_HEIGHT } from '../Header';

describe('Header', () => {

  it('useHeight', () => {
    let consumedHeight;
    function ReadHeight() {
      consumedHeight = Header.useHeight({safe: false});
      return null;
    }
    renderer.create(
      <ReadHeight/>
    );
    expect(consumedHeight).toBe(HEADER_HEIGHT);
  });

  it('<ScrollSpacer />', () => {
    const tree = renderer.create(
      <Header.ScrollSpacer/>
    );
    expect(tree).toMatchSnapshot();
  });

});
