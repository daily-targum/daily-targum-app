

import React from 'react';
import ConsecutiveTouchable, { RESET_DELAY } from '../ConsecutiveTouchable';
import renderer from 'react-test-renderer';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

describe('<ConsecutiveTouchable />', () => {

  it('ten consecutive taps', () => {
    const onConsecutivePress = jest.fn();
    const tree = renderer.create(
      <ConsecutiveTouchable
        onPress={onConsecutivePress}
        requiredTaps={10}
      />
    );
    const touchable = tree.root.findByType(TouchableWithoutFeedback);
    for(let i = 0; i < 10; i++) {
      renderer.act(() => {
        expect(onConsecutivePress).toBeCalledTimes(0);
        touchable.props.onPress();
      });
    }
    expect(onConsecutivePress).toBeCalledTimes(1);
  });

  it('taps resets after 500ms', () => {
    const onConsecutivePress = jest.fn();
    const tree = renderer.create(
      <ConsecutiveTouchable
        onPress={onConsecutivePress}
        requiredTaps={10}
      />
    );
    const touchable = tree.root.findByType(TouchableWithoutFeedback);
    for(let i = 0; i < 10; i++) {
      renderer.act(() => {
        expect(onConsecutivePress).toBeCalledTimes(0);
        touchable.props.onPress();
        // for some reason timeout 
        // needs to be multiplied by 2
        jest.advanceTimersByTime(RESET_DELAY * 2);
      });
    }
    expect(onConsecutivePress).toBeCalledTimes(0);
  });

});