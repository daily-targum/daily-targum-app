import React from 'react';
import { Text as DefaultText, TextProps as DefaultTextProps, View } from 'react-native';
import Theme from './Theme';

const FONT_BASE = 15;
const LINE_HEIGHT_MULTIPLIER = 1.2;
const LINE_HEIGHT_MULTIPLIER_PARAGRAPH = 1.8;

function getFontSize(
  multiplier: number, 
  type: 'normal' | 'paragraph' = 'normal'
) {
  return {
    fontSize: multiplier * FONT_BASE,
    lineHeight: multiplier * FONT_BASE * (type === 'normal' ? LINE_HEIGHT_MULTIPLIER : LINE_HEIGHT_MULTIPLIER_PARAGRAPH)
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
  variant,
  noPadding = false,
  lockNumberOfLines = false,
  ...props
}: TextProps) {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <DefaultText 
      {...props}
      style={[
        styles.textBase,
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
  textBase: {
    color: theme.colors.text
  },
  h1: {
    fontWeight: '700',
    ...getFontSize(2),
    marginBottom: theme.spacing(1)
  },
  h2: {
    fontWeight: '700',
    ...getFontSize(1.7),
    marginBottom: theme.spacing(2)
  },
  h3: {
    fontWeight: '700',
    ...getFontSize(1.3),
    marginBottom: theme.spacing(2)
  },
  h4: {
    fontWeight: '700',
    ...getFontSize(1.2),
    marginBottom: theme.spacing(1)
  },
  h5: {
    fontWeight: '700',
    ...getFontSize(1.2),
    marginBottom: theme.spacing(1),
  },
  h6: {
    ...getFontSize(0.9),
    marginBottom: theme.spacing(1),
  },
  p: {
    marginBottom: theme.spacing(2),
    ...getFontSize(1, 'paragraph'),
  },
  span: {
    ...getFontSize(1),
  },
  br: {
    height: theme.spacing(2),
  },
  noPadding: {
    marginBottom: 0
  }
}));

Text.Br = Br;
Text.FONT_BASE = FONT_BASE;
export default Text;