import React, { useRef } from 'react';
import { View, ScrollViewProps, Platform, Animated } from 'react-native';
import Theme from '../components/Theme';
import Constants from 'expo-constants';
const iosOldScrollMode = parseFloat(Constants.platform?.ios?.systemVersion || '13') < 13;

interface ScrollViewWithHeaderProps extends ScrollViewProps {
  children: React.ReactNode,
  Header: React.ReactNode,
  headerHeight: number
}

export function ScrollViewWithHeader({
  children,
  Header,
  headerHeight,
  ...scrollViewProps
}: ScrollViewWithHeaderProps) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const {insets} = Theme.useTheme();
  const safeHeaderHeight = headerHeight + insets.top;
  return (
    <View>
      <Animated.View
        style={{
          position: 'absolute',
          transform: [{
            translateY: scrollY.interpolate({
              inputRange: [0, safeHeaderHeight],
              outputRange: [0, -safeHeaderHeight],
              extrapolate: 'clamp'
            })
          }],
          top: 0,
          left: 0,
          right: 0,
          height: safeHeaderHeight
        }}
      >
        {Header}
      </Animated.View>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={12}
        scrollIndicatorInsets={{top: headerHeight + (iosOldScrollMode ? insets.top : 0)}}
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior='never'
        {...scrollViewProps}
      >
        <View style={{height: headerHeight + insets.top}}/>
        {children}
      </Animated.ScrollView>
    </View>
  );
}

export function BypassAnimation({
  children,
  Header,
  headerHeight,
  ...scrollViewProps
}: ScrollViewWithHeaderProps) {
  return (
    <Animated.ScrollView
      {...scrollViewProps}
    >
      <View 
        style={{
          height: headerHeight
        }}
      >
        {Header}
      </View>
      {children}
    </Animated.ScrollView>
  );
}

export default Platform.select({
  default: BypassAnimation,
  ios: ScrollViewWithHeader
});