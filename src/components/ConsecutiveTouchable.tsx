import React, { useState, useEffect, useRef } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ViewStyle } from 'react-native';

export const RESET_DELAY = 500;

function ConsecutiveTouchable({
  children,
  requiredTaps = 10,
  onPress,
  style
}: {
  children?: React.ReactNode,
  requiredTaps?: number,
  onPress: () => void,
  style?: ViewStyle | ViewStyle[]
}) {
  const [consecutiveTaps, setConsecutiveTaps] = useState(0);
  let callbackID = useRef<NodeJS.Timeout>();
  function handlePress() {
    if(callbackID.current) clearTimeout(callbackID.current);
    setConsecutiveTaps(consecutiveTaps + 1);
    // wait up to 300ms for the next tap
    callbackID.current = setTimeout(() => {
      setConsecutiveTaps(0);
    }, RESET_DELAY);
    if(consecutiveTaps === requiredTaps - 1) {
      onPress();
    }
  }
  useEffect(() => {
    return () => {
      if(callbackID.current) clearTimeout(callbackID.current);
    };
  }, []);
  return (
    <TouchableWithoutFeedback
      style={style}
      onPress={handlePress}
    >
      {children}
    </TouchableWithoutFeedback>
  );
}

export default ConsecutiveTouchable;