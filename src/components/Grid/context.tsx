import React from 'react';
import { breakPointKeys } from './config';
import { BreakPoint } from './types';

export const Context = React.createContext<{
  breakPoint: BreakPoint
  spacing: number
}>({
  breakPoint: 'xs', 
  spacing: 0
});

// Web and Native
export function useGrid(): { 
  breakPoint: BreakPoint | null, 
  spacing: number 
} {
  return React.useContext(Context);
}

// Web and Native
export function useResponsiveStyles(styles: any) {
  const { breakPoint } = React.useContext(Context);

  let style: any;
  breakPointKeys.forEach((key: BreakPoint) => {
    if(styles[key] !== undefined && breakPoint !== null && breakPointKeys.indexOf(key) <= breakPointKeys.indexOf(breakPoint)) {
      style = styles[key];
    }
  });

  return style;
}

// Web and Native
export function Consumer({ 
  children 
}: {
  children: (context: { breakPoint: BreakPoint | null, spacing: number }) => any
}) {
  return children(useGrid());
}


// Web and Native
export function BreakpointSwitch(styles: any) {
  const { breakPoint } = React.useContext(Context);

  let style: any;
  breakPointKeys.forEach((key: BreakPoint) => {
    if(styles[key] !== undefined && breakPoint !== null && breakPointKeys.indexOf(key) <= breakPointKeys.indexOf(breakPoint)) {
      style = styles[key];
    }
  });

  return style;
}