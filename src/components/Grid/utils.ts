import { breakPointKeys, breakPoints } from './config';
import { BreakPoint, BreakPoints, ComputedBreakPoints } from './types';

// Web and Native
export function getBreakpoint(windowWidth: number): BreakPoint {
  let breaker: BreakPoint = 'xs';
  breakPointKeys.forEach((key: BreakPoint) => {
    if(windowWidth > breakPoints[key]) {
      breaker = key;
    }
  });
  return breaker;
}

// Web and Native
export function computeBreakpoints(breakpoints: BreakPoints): ComputedBreakPoints {
  let computedBreakPoints: BreakPoints = {};
  let crntWidth = '';
  breakPointKeys.forEach(key => {
    if(typeof breakpoints[key] === 'number') {
      // @ts-ignore
      crntWidth = breakpoints[key] / 0.24 + '%';
    } else if(typeof breakpoints[key] === 'string') {
      // @ts-ignore
      crntWidth = breakpoints[key];
    }
    computedBreakPoints[key] = crntWidth;
  });
  return computedBreakPoints as any;
}