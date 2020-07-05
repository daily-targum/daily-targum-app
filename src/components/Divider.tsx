import React from 'react';
import { View } from 'react-native';
import { useTheme } from './Theme';

export function Divider({
  color
}: {
  color?: string
}) {
  const theme = useTheme();

  return (
    <View
      style={{
        height: 0.5,
        backgroundColor: color || theme.colors.divider
      }}
    />
  );
}

export default Divider;