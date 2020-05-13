import React, { useEffect, useRef } from 'react';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { errorActions, useErrorSelector } from '../store/ducks/error';
import Theme from '../components/Theme';
import Animated, { Easing } from 'react-native-reanimated';

const HEIGHT = 30;

function ErrorSnackbar() {
  const {colors, insets} = Theme.useTheme();
  const error = useErrorSelector(s => s.error);
  const dispatch = useDispatch();

  let id: NodeJS.Timeout;
  useEffect(() => {
    id = setTimeout(() => {
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
          outputRange: [0, HEIGHT + insets.top],
        }),
        backgroundColor: colors.accent,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text
        style={{
          color: '#fff',
          paddingTop: insets.top
        }}
      >{error}</Text>
    </Animated.View>
  );
}

export default ErrorSnackbar;