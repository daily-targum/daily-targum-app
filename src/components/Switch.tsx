import React from 'react';
import { Switch as DefaultSwitch, SwitchProps } from 'react-native';
import Theme from './Theme';

export function Switch(props: SwitchProps) {
  const theme = Theme.useTheme();
  return (
    <DefaultSwitch
      trackColor={{
        true: theme.colors.accent,
        false: theme.colors.textMuted
      }}
      {...props}
    />
  );
}

export default Switch;