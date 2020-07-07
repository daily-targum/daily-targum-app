import React, { useEffect, useRef } from 'react';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { errorActions } from '../store/ducks/error';
import Theme from '../components/Theme';
import Animated, { Easing } from 'react-native-reanimated';
import { useSelector } from '../store';

const HEIGHT = 30;

export function ErrorSnackbar() {
  const theme = Theme.useTheme();
  const error = useSelector(s => s.error.error);
  const dispatch = useDispatch();

  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(errorActions.clearError());
    }, 5000);
    return () => clearTimeout(id);
  }, [error]);

  const visible = error !== null;
  const height = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(height, {
      toValue: +visible,
      duration: 250,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, [visible]);

  return (
    <Animated.View
      style={{
        height: height.interpolate({
          inputRange: [0, 1],
          outputRange: [0, HEIGHT + theme.insets.top],
        }),
        backgroundColor: theme.colors.accent,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text
        style={{
          color: '#fff',
          paddingTop: theme.insets.top
        }}
      >{error}</Text>
    </Animated.View>
  );
}

export default ErrorSnackbar;