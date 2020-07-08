import { View } from 'react-native';

export const Value = () => ({
  interpolate: jest.fn()
});

export const event = jest.fn();
export const add = jest.fn();
export const eq = jest.fn();
export const set = jest.fn();
export const cond = jest.fn();
export const interpolate = jest.fn();
export const Extrapolate = { CLAMP: jest.fn() };
export const Easing = {
  inOut: jest.fn(),
};
export const timing = () => ({
  start: jest.fn()
});

export default {
  View,
  Value,
  timing
};