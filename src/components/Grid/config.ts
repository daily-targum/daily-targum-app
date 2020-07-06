import { BreakPoint } from './types';

export const breakPoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600
};
export const breakPointKeys: BreakPoint[] = Object.keys(breakPoints) as BreakPoint[];