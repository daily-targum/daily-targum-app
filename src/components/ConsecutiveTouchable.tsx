import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ViewStyle } from 'react-native';

export const RESET_DELAY = 500;

export function ConsecutiveTouchable({
  children,
  requiredTaps = 10,
  onPress,
  style
}: {
  children?: React.ReactNode,
  requiredTaps?: number,
  onPress: () => any,
  style?: ViewStyle | ViewStyle[]
}) {
  const [ consecutiveTaps, setConsecutiveTaps ] = React.useState(0);
  const callbackID = React.useRef<NodeJS.Timeout>();

  function handlePress() {
    if(callbackID.current) {
      clearTimeout(callbackID.current);
    }
    setConsecutiveTaps(consecutiveTaps + 1);
    // wait up to 300ms for the next tap
    callbackID.current = setTimeout(() => {
      setConsecutiveTaps(0);
    }, RESET_DELAY);
    if(consecutiveTaps === requiredTaps - 1) {
      onPress();
    }
  }

  React.useEffect(() => {
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