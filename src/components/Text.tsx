import React from 'react';
import { Text as DefaultText, TextProps as DefaultTextProps, PixelRatio } from 'react-native';
import Theme from './Theme';

const FONT_BASE = 16;

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
// const variants: Variant[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'];

export interface TextProps extends DefaultTextProps {
  children?: string | string[] | null,
  variant?: Variant
}

export function Text({
  variant,
  ...props
}: TextProps) {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <DefaultText 
      {...props}
      style={[
        styles.textBase,
        variant ? styles[variant] : null,
        props.style
      ]}
    />
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  textBase: {
    color: theme.colors.text
  },
  h1: {
    fontWeight: '700',
    fontSize: FONT_BASE * 2,
    marginBottom: theme.spacing(1)
  },
  h2: {
    fontWeight: '700',
    fontSize: FONT_BASE * 1.7,
    marginBottom: theme.spacing(2)
  },
  h3: {
    fontWeight: '700',
    fontSize: FONT_BASE * 1.4,
    marginBottom: theme.spacing(2)
  },
  h4: {
    fontWeight: '700',
    fontSize: FONT_BASE * 1.2,
    marginBottom: theme.spacing(1)
  },
  h5: {
    fontWeight: '700',
    marginBottom: theme.spacing(1),
    fontSize: FONT_BASE
  },
  h6: {
    marginBottom: theme.spacing(1),
    fontSize: FONT_BASE * 0.8
  },
  p: {
    marginBottom: theme.spacing(2),
    lineHeight: FONT_BASE * 1.8,
    fontSize: FONT_BASE
  },
  span: {
  },
  br: {
    height: theme.spacing(2),
  },
  noPadding: {
    marginBottom: 0
  }
}));

export default Text;