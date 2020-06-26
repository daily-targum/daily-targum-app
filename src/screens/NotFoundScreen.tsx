import React from 'react';
import { View } from 'react-native';
import { Theme, Text } from '../components';

function NotFound() {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>404. Not Found.</Text>
        <Text style={styles.subtitle}>This page was eaten by an aggressive coyote.</Text>
      </View>
    </View>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2)
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    textTransform: 'uppercase'
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: 22
  }
}));

export default NotFound;