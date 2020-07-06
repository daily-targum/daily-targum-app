import React from 'react';
import { styleHelpers } from '../utils';
import { ReactChildren } from '../types';
import { View, ViewStyle, ImageBackground } from 'react-native';

export function AspectRatioView({
  aspectRatio,
  children,
  style,
  styleInside
}: {
  aspectRatio: [number, number]
  children?: ReactChildren
  style?: ViewStyle
  styleInside?: ViewStyle
}) {
  return (
    <View 
      style={style}
    >
      <View 
        style={{
          // ...styleHelpers.aspectRatioFullWidth(...aspectRatio),
          aspectRatio: aspectRatio[0] / aspectRatio[1],
          ...styleInside
        }}
      >
        {children}
      </View>
    </View>
  );
}

export function AspectRatioImage({
  aspectRatio,
  src,
  style,
}: {
  aspectRatio: [number, number]
  src: string
  style?: ViewStyle
}) {
  return (
    <ImageBackground
      source={{uri: src}}
      style={[
        {
          aspectRatio: aspectRatio[0] / aspectRatio[1],
        },
        style
      ]}
    />
  );
}