import React from 'react';
import { useStyleCreator, makeStyleCreator } from './Theme';
import { View, ViewStyle, useWindowDimensions } from 'react-native';

export function Section({
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
  const dimensions = useWindowDimensions();
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
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    width: '100%'
  }
}));

export default Section;