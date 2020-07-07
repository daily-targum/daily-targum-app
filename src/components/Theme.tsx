import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Appearance, AppearanceProvider } from 'react-native-appearance';
import { useSafeArea, EdgeInsets } from 'react-native-safe-area-context';
import { Provider as ContextThemeProvider, useTheme as defaultUseTheme, Context } from 'react-context-theming/lib/index';
import * as NativeTheming from 'react-context-theming/lib/native';
import { StyleCreatorFunction, GenerateStylesFunction } from 'react-context-theming/lib/native';
import { ComputedTheme } from '../types';
import { theme } from '../constants';
import { StyleSheet, Platform } from 'react-native';
import { useSelector } from '../store';

/**
 * THIS IS A HACK!!!
 * From some reason, edge inset top
 * always seems to be to large. It 
 * seems that multiplying it by 2/3 
 * gives a good approximation of the
 * actual height of the notch.
 */
function statusBarHeight(insets: EdgeInsets) {
  let {top} = insets;
  if(Platform.OS === 'ios') {
    top *= 2/3;
  }
  return Math.round(top);
}

export function Provider({ children }: {children: React.ReactNode}) {
  const insets = useSafeArea();
  const darkModeOverride = useSelector(s => s.theme.darkModeOverride);
  const useDeviceSettings = useSelector(s => s.theme.useDeviceSettings);
  const [ activeTheme, setActiveTheme ] = React.useState(darkModeOverride ? theme.dark : theme.light);
  const [ systemWideDarkMode, setSystemWideDarkMode ] = React.useState(false);

  function updateTheme() {
    const darkAppearance = Appearance.getColorScheme() === 'dark';
    const darkMode = useDeviceSettings ? darkAppearance : darkModeOverride;
    setActiveTheme(darkMode ? theme.dark : theme.light);
    setSystemWideDarkMode(darkAppearance);
  }

  // subscribe to dark mode
  React.useEffect(() => {
    if(useDeviceSettings) {
      const subscription = Appearance.addChangeListener(() => updateTheme());
      return function cleanup() {
        subscription.remove();
      };
    }
  }, [useDeviceSettings]);

  // subscribe to screen rotation
  React.useEffect(() => {
    updateTheme();
  }, [darkModeOverride, useDeviceSettings]);

  const {colors} = activeTheme;

  // pass theme props down
  // to React Native Paper
  const computedPaperTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      accent: colors.accent,
      text: colors.text,
      background: colors.background,
      surface: colors.surface,
      divider: colors.divider
    },
    dark: activeTheme.dark,
    roundness: activeTheme.roundness()
  };

  const computedTheme = {
    ...activeTheme, 
    insets, 
    systemWideDarkMode,
    statusBarHeight: statusBarHeight(insets)
  }

  return (
    <AppearanceProvider>
      <ContextThemeProvider<any> theme={computedTheme}>
        <PaperProvider theme={computedPaperTheme}>{children}</PaperProvider>
      </ContextThemeProvider>
    </AppearanceProvider>
  );
}

export const useTheme = (): ComputedTheme => defaultUseTheme<ComputedTheme>();

export function makeStyleCreator<
  T = ComputedTheme, 
  S extends StyleSheet.NamedStyles<S> | StyleSheet.NamedStyles<any> = never
>(
  styleFn: StyleCreatorFunction<T, S> | GenerateStylesFunction<T, S>
): GenerateStylesFunction<T, S> {
  return NativeTheming.makeStyleCreator<T, S>(styleFn);
}

export function useStyleCreator<
  T = ComputedTheme, 
  S = never
>(
  styleFn: GenerateStylesFunction<T, S>,
  ...extraData: any[]
) {
  return NativeTheming.useStyleCreator<T, S>(styleFn, ...extraData)
};

export function withStyleCreator<
  T = ComputedTheme,
  S = never
>(
  Component: any, 
  styleFn: GenerateStylesFunction<T, S>,
  ...extraData: any[]
): any {
  return NativeTheming.withStyleCreator<T, S>(Component, styleFn, ...extraData)
}

export function withTheme(Component: any): any {
  return class WrappedComponent extends React.Component<{}, null> {
    static contextType = Context;
    render() {
      return <Component {...this.props} theme={this.context}/>;
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
};