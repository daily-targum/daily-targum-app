import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator as Indicator, ActivityIndicatorProps } from 'react-native';
import Theme from './Theme';
import { styleHelpers } from '../utils';

/**
 * How long the activity indicator,
 * will wait to show a spinner
 *
 * IN THE FUTURE, this feature may
 * be built intro react concurrent mode,
 * but as of writing this it isn't
 */
export const SPINNER_DELAY = 750;


export function ActivityIndicator(props : ActivityIndicatorProps) {
  const {colors} = Theme.useTheme();
  const styles = Theme.useStyleCreator(styleCreator);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setVisible(true);
    }, SPINNER_DELAY);
    return () => clearTimeout(id);
  }, []);

  return !visible ? null : (
    <Indicator
      color={colors.spinner}
      style={styles.activityIndicator}
      {...props}
    />
  );
}

function ActivityIndicatorScreen() {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <View style={styles.activityIndicatorScreen}>
      <ActivityIndicator />
    </View>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  activityIndicator: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  activityIndicatorScreen: {
    ...styleHelpers.absoluteFill(),
    backgroundColor: theme.colors.background,
    alignContent: 'center',
    justifyContent: 'center'
  }
}));

ActivityIndicator.Screen = ActivityIndicatorScreen;
export default ActivityIndicator;