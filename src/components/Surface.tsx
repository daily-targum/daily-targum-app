import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useTheme } from './Theme';
import { BlurView } from 'expo-blur';

const opacityDark = Platform.select({
  ios: 0.6,
  android: 1,
  web: 0.8
});

const opacityLight = Platform.select({
  ios: 0.78,
  android: 1,
  web: 0.8
});

function Surface({
  style,
  innerStyle,
  children,
  backgroundTint,
  tint = 'auto'
}: {
  style?: any,
  innerStyle?: any,
  children?: React.ReactNode,
  backgroundTint?: string,
  tint?: 'dark' | 'light' | 'default' | 'auto'
}) {
  const {dark, colors} = useTheme();
  if(tint == 'auto') {
    tint = dark ? 'light' : 'dark';
  }
  return (
    <BlurView tint={tint} intensity={100} style={style}>
      <View
        style={[StyleSheet.absoluteFillObject, {
          opacity: dark ? opacityDark : opacityLight,
          backgroundColor: backgroundTint || colors.surface
        }, innerStyle]}
      />
      {children}
    </BlurView>
  );
}

export default Surface;