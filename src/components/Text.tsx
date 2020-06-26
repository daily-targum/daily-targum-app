import React from 'react';
import { Text as DefaultText, TextProps as DefaultTextProps } from 'react-native';
import Theme from './Theme';

export interface TextProps extends DefaultTextProps {
  children?: string | string[] | null
}

export function Text(props: TextProps) {
  const theme = Theme.useTheme();
  return (
    <DefaultText 
      {...props}
      style={[
        {color: theme.colors.text}, 
        props.style
      ]}
    />
  );
}

export default Text;