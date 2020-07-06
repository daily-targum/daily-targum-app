import React from 'react';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

// type definitions
export type NativeStyle = ViewStyle | TextStyle | ImageStyle;

export interface GlobalBreakPoints {
  xs: number,
  sm: number,
  md: number,
  lg: number,
  xl: number,
  xxl: number
}

export interface BreakPoints {
  xs?: number | string,
  sm?: number | string,
  md?: number | string,
  lg?: number | string,
  xl?: number | string,
  xxl?: number | string
}

export interface ComputedBreakPoints {
  xs: number | string,
  sm: number | string,
  md: number | string,
  lg: number | string,
  xl: number | string,
  xxl: number | string
}

export interface ComputedStyles {
  xs?: NativeStyle
  sm?: NativeStyle
  md?: NativeStyle
  lg?: NativeStyle
  xl?: NativeStyle
  xxl?: NativeStyle
}

export type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface ColProps extends BreakPoints {
  style?: NativeStyle
  children?: React.ReactNode
}

export interface RowProps extends BreakPoints {
  style?: NativeStyle
  children?: React.ReactNode
  spacing?: number
}

export interface ConsumerProps {
  children: React.ReactElement
}