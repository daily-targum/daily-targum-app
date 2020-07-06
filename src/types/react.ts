import React from 'react';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
export type ReactNativeStyle = ViewStyle | TextStyle | ImageStyle;
export type ReactChild = React.ReactElement | null;
export type ReactChildren = ReactChild | ReactChild[];