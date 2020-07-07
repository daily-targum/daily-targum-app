import { Theme } from '../types';
import { Platform } from 'react-native';

const light: Theme = {
  colors: {
    primary: '#000',
    accent: '#f70737',
    text: '#000',
    textMuted: '#999',
    spinner: '#bbb',
    background: '#fff',
    surface: '#555',
    divider: 'rgba(0,0,0,0.1)',
    touchableHighlight: '#eee',
    button: '#eee'
  },
  font: {
    light: '',
    regular: '',
    medium: '',
    bold: ''
  },
  insets: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  dark: false,
  roundness: (multiplier: number = 1) => 10 * multiplier,
  spacing: (multiplier: number = 1) => 7 * multiplier
}

const dark: Theme = {
  ...light,
  colors: {
    ...light.colors,
    primary: Platform.select({
      ios: '#000',
      default: '#202020'
    }),
    accent: '#f70737',
    text: '#fff',
    textMuted: 'rgba(255,255,255,0.6)',
    spinner: '#ccc',
    background: '#000',
    surface: '#fff',
    divider: 'rgba(255,255,255,0.15)',
    touchableHighlight: 'rgba(0,0,0,0.4)',
    button: '#fff'
  },
  dark: true
}

export const theme = {
  dark,
  light
}