jest.mock('../Theme');

import React from 'react';
import Button from '../Button';
import renderer from 'react-test-renderer';
import { TouchableOpacity, Text } from 'react-native';

describe('<Button />', () => {

  it('button renders correctly', () => {
    const tree = renderer.create(
      <Button onPress={() => {}}>Click Me!</Button>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  it('button renders correctly with ReactNode child', () => {
    const tree = renderer.create(
      <Button onPress={() => {}}>
        <Text>Click Me!</Text>
      </Button>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('button onPress', () => {
    const onPress = jest.fn();
    const tree = renderer.create(
      <Button onPress={onPress}>Click Me!</Button>
    );
    tree.root.findByType(TouchableOpacity).props.onPress();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('text button renders correctly', () => {
    const tree = renderer.create(
      <Button.Text onPress={() => {}}>Click Me!</Button.Text>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('text button onPress', () => {
    const onPress = jest.fn();
    const tree = renderer.create(
      <Button.Text onPress={onPress}>Click Me!</Button.Text>
    );
    tree.root.findByType(TouchableOpacity).props.onPress();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

});