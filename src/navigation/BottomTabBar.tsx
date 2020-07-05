import React from 'react';
import { View, Platform, Animated, Easing } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/core';
import { Surface, Theme, Section } from '../components';
import { navigation as navConfig } from '../constants';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';

export const HEIGHT = navConfig.bottomTabBar.height;

function Footer(props: BottomTabBarProps) {
  const { insets, colors } = Theme.useTheme();
  const navigation = useNavigation();
  const visible = useSelector((s: any) => s.navigation.bottomTabBarVisible);
  const offset = React.useRef(new Animated.Value(+visible)).current;

  React.useEffect(() => {
    Animated.timing(offset, {
      toValue: +visible,
      easing: Easing.inOut(Easing.ease),
      duration: 220,
      useNativeDriver: true
    }).start();
  }, [visible]);

  return (
    <Animated.View
      style={{
        height: navConfig.bottomTabBar.height + insets.bottom,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        transform: [{ 
          translateY: offset.interpolate({
            inputRange: [0, 1],
            outputRange: [HEIGHT + insets.bottom, 0]
          })
        }],
      }}
    >
      <Surface
        tint='dark'
        style={[props.style, {
          height: navConfig.bottomTabBar.height + insets.bottom
        }]}
        backgroundTint={colors.primary}
      >
        <Section 
          style={{
            flex: 1,
            marginBottom: insets.bottom,
            borderTopWidth: 0.5,
            borderTopColor: colors.divider
          }}
          innerStyle={{
            padding: 0,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >
          {Object.keys(props.descriptors).map((d, i) => {
            const descriptor: any = props.descriptors[d];
            return (
              <TouchableOpacity
                key={d}
                onPress={() => navigation.navigate({ key: d })}
              >
                {descriptor.options.tabBarIcon({
                  size: 24,
                  focused: i === props.state.index,
                  // TODO: check how react navigation has this configured
                  color: i === props.state.index ? props.activeTintColor : props.inactiveTintColor
                })}
              </TouchableOpacity>
            );
          })}
        </Section>
      </Surface>
    </Animated.View>
  );
}

function useHeight({
  safe = true
}: {
  safe?: boolean
}) {
  const {insets} = Theme.useTheme();

  const paddingBottom = (safe ? insets.bottom : 0);
  return navConfig.bottomTabBar.height + paddingBottom;
}

function getUnsafeHeight(): number {
  return navConfig.bottomTabBar.height;
}

function ScrollSpacer() {
  const paddingBottom = useHeight({safe: true});
  return (
    <View style={{
      height: Platform.OS !== 'ios' ? paddingBottom : 0
    }}/>
  );
}

Footer.useHeight = useHeight;
Footer.getUnsafeHeight = getUnsafeHeight;
Footer.ScrollSpacer = ScrollSpacer;
export default Footer;