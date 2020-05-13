import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import Surface from '../Surface';

describe('<Surface />', () => {

  it('renders correctly', () => {
    const tree = renderer.create(
      <Surface>
        <Text>Hello World</Text>
      </Surface>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
