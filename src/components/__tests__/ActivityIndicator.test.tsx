import React from 'react';
import ActivityIndicator, { SPINNER_DELAY } from '../ActivityIndicator';
import renderer from 'react-test-renderer';

jest.useFakeTimers();

describe('<ActivityIndicator />', () => {

  it('initially renders null', () => {
    const tree = renderer.create(
      <ActivityIndicator />
    ).toJSON();
    expect(tree).toBe(null);
  });

  it('eventually renders spinner', () => {
    const tree = renderer.create(<ActivityIndicator />);
    renderer.act(() => {
      // THIS IS A HACK
      // Not sure why SPINNER_DELAY 
      // needs to be multiplied by two
      jest.advanceTimersByTime(SPINNER_DELAY * 2);
    });
    renderer.act(() => {
      const jsonTree = tree.toJSON();
      expect(jsonTree).not.toBe(null);
      expect(jsonTree).toMatchSnapshot();
    });
  });

});


describe('<ActivityIndicator.Screen />', () => {

  it('initially renders null', () => {
    const tree = renderer.create(<ActivityIndicator.Screen />).toJSON();
    expect(tree?.children).toBe(null);
    expect(tree).toMatchSnapshot();
  });

  it('eventually renders spinner', () => {
    const tree = renderer.create(<ActivityIndicator.Screen />);
    renderer.act(() => {
      // THIS IS A HACK
      // Not sure why SPINNER_DELAY 
      // needs to be multiplied by two
      jest.advanceTimersByTime(SPINNER_DELAY * 2);
    });
    renderer.act(() => {
      const jsonTree = tree.toJSON();
      expect(jsonTree).not.toBe(null);
      expect(jsonTree).toMatchSnapshot();
    });
  });

});
