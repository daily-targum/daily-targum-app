jest.mock('../../components/Theme');

jest.mock('@react-navigation/core', () => {
  const navigate = jest.fn();
  const openDrawer = jest.fn();
  return {
    useNavigation: () => ({
      navigate,
      openDrawer
    })
  };
});

// TODO: THIS IS A HACK! Fix this
jest.mock('@expo/vector-icons', () => ({ 
  FontAwesome: () => null
}));

import React from 'react';
import renderer from 'react-test-renderer';
import Drawer from '../Drawer';

describe('Drawer', () => {

  it('renders correctly', () => {
    const tree = renderer.create(
      <Drawer/>
    );
    expect(tree).toMatchSnapshot();
  });

  it('button renders correctly', () => {
    const tree = renderer.create(
      <Drawer.Button/>
    );
    expect(tree).toMatchSnapshot();
  });

});
