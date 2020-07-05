import React from 'react';
import { TouchableOpacity, ViewStyle, Text, TextStyle } from 'react-native';
import { useStyleCreator, makeStyleCreator, useTheme } from './Theme';
import { styleHelpers } from '../utils';

export function Button({
  children,
  onPress,
  style
}: {
  children: string | React.ReactNode,
  onPress: () => any,
  style?: ViewStyle,
}) {
  const {colors} = useTheme();
  const styles = useStyleCreator(styleCreator);
  return (
    <TouchableOpacity 
      style={[styles.touchableHighlight, style]}
      onPress={onPress}
      activeOpacity={0.6}
    >
      {typeof children === 'string' ? (
        <Text style={styles.text}>{children}</Text>
      ) : (
        <>
          {children}
        </>
      )}
    </TouchableOpacity>
  );
}

function TextButton({
  children,
  onPress,
  style
}: {
  children: string,
  onPress: () => any,
  style?: TextStyle,
}) {
  const styles = useStyleCreator(styleCreator);
  return (
    <TouchableOpacity 
      style={[styles.touchableOpacity, style]}
      onPress={onPress}
    >
      <Text style={styles.textButton}>{children}</Text>
    </TouchableOpacity>
  );
}

const styleCreator = makeStyleCreator(theme => ({
  touchableHighlight: {
    ...styleHelpers.flex('row'),
    padding: theme.spacing(0.5),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    alignItems: 'center',
    backgroundColor: theme.colors.button,
    borderRadius: theme.roundness()
  },
  touchableOpacity: {
    ...styleHelpers.flex('row'),
    alignItems: 'center'
  },
  text: {
    color: theme.colors.accent,
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 14
  },
  textButton: {
    color: theme.colors.accent,
    fontWeight: '500',
    fontSize: 17
  }
}));

Button.Text = TextButton;
export default Button;