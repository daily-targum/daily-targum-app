import React from 'react';
import { useStyleCreator, makeStyleCreator } from './Theme';
import { View, ViewStyle } from 'react-native';

function Section({
  children,
  style,
  innerStyle,
  testID
}: {
  children: React.ReactNode,
  style?: ViewStyle | ViewStyle[],
  innerStyle?: ViewStyle | ViewStyle[],
  testID?: string
}) {
  const styles = useStyleCreator(styleCreator);
  return (
    <View 
      testID={testID} 
      style={[styles.sectionWrap, style]}
    >
      <View style={[styles.section, innerStyle]}>
        {children}
      </View>
    </View>
  )
}

const styleCreator = makeStyleCreator(theme => ({
  sectionWrap: {
    alignItems: 'center'
  },

  section: {
    flex: 1,
    padding: theme.spacing(2),
    maxWidth: 750,
    width: '100%'
  }
}));

export default Section;