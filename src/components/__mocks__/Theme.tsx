import React from 'react';
import { theme } from '../../constants';
import { ComputedTheme } from '../../types';
import { makeStyleCreator, GenerateStylesFunction } from 'react-context-theming/lib/native';
import { Provider } from 'react-context-theming';

const THEME: ComputedTheme = {
  ...theme.light,
  insets: {
    ...theme.light.insets,
    top: 30
  },
  systemWideDarkMode: theme.light.dark,
  statusBarHeight: 30
};

export const useTheme: () => ComputedTheme = () => THEME;

export function useStyleCreator<
  S = never
>(
  styleFn: GenerateStylesFunction<ComputedTheme, S>,
  ...extraData: any[]
) {
  return styleFn(useTheme(), ...extraData);
};

export function withTheme(Component: any): any {
  return class WrappedComponent extends React.Component<{}, null> {
    render() {
      return <Component {...this.props} theme={THEME}/>;
    }
  };
}

export function withStyleCreator<
  S = never
>(
  Component: any, 
  styleFn: GenerateStylesFunction<ComputedTheme, S>,
  ...extraData: any[]
): any {
  return class WrappedComponent extends React.Component<{}, null> {
    render() {
      return (
        <Component 
          {...this.props} 
          styles={styleFn(THEME, ...extraData)}
          theme={this.context}
        />
      );
    }
  };
}

export default {
  Provider,
  useTheme,
  makeStyleCreator,
  useStyleCreator,
  withStyleCreator,
  withTheme
}
export {
  Provider,
  makeStyleCreator,
}