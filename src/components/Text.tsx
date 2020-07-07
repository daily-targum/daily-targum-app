import React from 'react';
import { Text as DefaultText, TextProps as DefaultTextProps, View } from 'react-native';
import Theme from './Theme';
import { Theme as ThemeType } from '../types';

const FONT_BASE = 16;
const LINE_HEIGHT_MULTIPLIER = 1.2;
const LINE_HEIGHT_MULTIPLIER_PARAGRAPH = 1.8;

function getTextBase({
  theme,
  size,
  type = 'normal'
} : {
  theme: ThemeType
  size: number
  type?: 'normal' | 'paragraph'
}) {
  return {
    color: theme.colors.text,
    fontSize: size * FONT_BASE,
    lineHeight: size * FONT_BASE * (type === 'normal' ? LINE_HEIGHT_MULTIPLIER : LINE_HEIGHT_MULTIPLIER_PARAGRAPH)
  } as const;
}

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
// const variants: Variant[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'];

export interface TextProps extends DefaultTextProps {
  children?: string | string[] | null,
  variant?: Variant
  noPadding?: boolean
  lockNumberOfLines?: boolean
}

export function Text({
  variant = 'span',
  noPadding = false,
  lockNumberOfLines = false,
  ...props
}: TextProps) {
  const styles = Theme.useStyleCreator(styleCreator);

  return (
    <DefaultText 
      {...props}
      style={[
        variant ? styles[variant] : null,
        noPadding ? styles.noPadding : null,
        props.style,
        (lockNumberOfLines && props.numberOfLines && variant) ? {
          minHeight: styles[variant].lineHeight * props.numberOfLines
        } : null
      ]}
    />
  );
}

export function Br() {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <View style={styles.br}/>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  h1: {
    ...getTextBase({
      theme,
      size: 2
    }),
    fontWeight: '800',
    marginBottom: theme.spacing(1)
  },
  h2: {
    ...getTextBase({
      theme,
      size: 1.7
    }),
    fontWeight: '700',
    marginBottom: theme.spacing(2)
  },
  h3: {
    ...getTextBase({
      theme,
      size: 1.3
    }),
    fontWeight: '700',
    marginBottom: theme.spacing(2)
  },
  h4: {
    ...getTextBase({
      theme,
      size: 1.3
    }),
    fontWeight: '700',
    marginBottom: theme.spacing(1)
  },
  h5: {
    ...getTextBase({
      theme,
      size: 1.2
    }),
    fontWeight: '700',
    marginBottom: theme.spacing(1),
  },
  h6: {
    ...getTextBase({
      theme,
      size: 0.9
    }),
    marginBottom: theme.spacing(1),
  },
  p: {
    ...getTextBase({
      theme,
      size: 1, 
      type: 'paragraph'
    }),
    marginBottom: theme.spacing(2),
  },
  span: {
    ...getTextBase({
      theme,
      size: 1
    }),
  },
  br: {
    height: theme.spacing(2),
  },
  noPadding: {
    marginBottom: 0
  },
  // extra styles for html view
  a: {
    ...getTextBase({
      theme,
      size: 1, 
      type: 'paragraph'
    }),
    color: theme.colors.accent,
    marginBottom: theme.spacing(2),
    textDecorationLine: 'underline'
  },
  b: {
    fontWeight: 'bold'
  }
}));

function useTextStyles() {
  return Theme.useStyleCreator(styleCreator);
}

Text.Br = Br;
Text.FONT_BASE = FONT_BASE;
Text.useStyles = useTextStyles;
export default Text;