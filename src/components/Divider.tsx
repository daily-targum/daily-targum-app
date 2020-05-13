import React from 'react';
import { View } from 'react-native';
import { useTheme } from './Theme';

function Divider({
  color
}: {
  color?: string
}) {
  const {colors} = useTheme();

  return (
    <View
      style={{
        height: 0.5,
        backgroundColor: color || colors.divider
      }}
    />
  );
}

export default Divider;