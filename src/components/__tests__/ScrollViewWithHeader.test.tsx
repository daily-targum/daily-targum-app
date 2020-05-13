jest.mock('../Theme');
jest.useFakeTimers();
console.warn = jest.fn();

import React from 'react';
import renderer from 'react-test-renderer';
import ScrollViewWithHeader, { BypassAnimation } from '../ScrollViewWithHeader';
import { Text, View } from 'react-native';


describe('<Section />', () => {

  it('ios', () => {
    const tree = renderer.create(
      <ScrollViewWithHeader
        Header={<View style={{flex: 1, height: 30}}/>}
        headerHeight={30}
      >
        <Text>Hello World!!!</Text>
      </ScrollViewWithHeader>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('bypass animation', () => {
    const tree = renderer.create(
      <BypassAnimation
        Header={<View style={{flex: 1, height: 30}}/>}
        headerHeight={30}
      >
        <Text>Hello World!!!</Text>
      </BypassAnimation>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
