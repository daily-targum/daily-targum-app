import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from './Theme';

export function Divider({
  color,
  style
}: {
  color?: string,
  style?: ViewStyle
}) {
  const theme = useTheme();

  return (
    <View
      style={[{
        height: 0.5,
        backgroundColor: color || theme.colors.divider
      }, style]}
    />
  );
}

export default Divider;