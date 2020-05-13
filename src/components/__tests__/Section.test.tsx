jest.mock('../Theme');

import React from 'react';
import renderer from 'react-test-renderer';
import Section from '../Section';
import { Text } from 'react-native';

describe('<Section />', () => {

  it('renders correctly', () => {
    const tree = renderer.create(
      <Section>
        <Text>Hello World!!!</Text>
      </Section>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
