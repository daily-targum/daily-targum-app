import React from 'react';
import { View, Platform, Text } from 'react-native';
import { Surface, Theme } from '../components';
import { Header as DefaultHeader, StackHeaderProps } from '@react-navigation/stack';
import Animated from 'react-native-reanimated';
import Drawer from '../navigation/Drawer';

export const HEIGHT: number = Platform.select({
  ios: 44,
  web: 64,
  android: 56,
  default: 44
});

function Header(props: StackHeaderProps) {
  const {colors} = Theme.useTheme();

  return (
    <View testID='Header'>
      <DefaultHeader
        {...props}
        scene={{
          ...props.scene,
          descriptor: {
            ...props.scene.descriptor,
            options: {
              headerTitleStyle: {
                color: '#fff'
              },
              headerTintColor: colors.accent,
              headerTransparent: true,
              headerBackground: () => (
                <Surface
                  tint='dark'
                  backgroundTint={colors.primary}
                  style={{
                    flex: 1
                  }}
                  innerStyle={{
                    borderBottomWidth: 1,
                    borderColor: colors.divider
                  }}
                />
              ),
              ...props.scene.descriptor.options
            }
          }
        }}
      />
    </View>
  );
}

function useHeight({
  safe = true
}: { 
  safe?: boolean 
}) {
  const {insets} = Theme.useTheme();
  const paddingTop = (safe ? insets.top : 0);
  return HEIGHT + paddingTop;
}

function ScrollSpacer() {
  const paddingTop = useHeight({safe: true});
  return (
    <View style={{
      height: Platform.OS !== 'ios' ? paddingTop : 0
    }}/>
  );
}

function AnimatedHeader({
  title,
  scrollY,
  offset = 0
}: {
  title: string,
  scrollY: Animated.Value<number>,
  offset: number
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  const {colors} = Theme.useTheme();
  return (
    <Animated.View style={[styles.headerWrap, {
      opacity: scrollY.interpolate({
        inputRange: [offset, offset + 25],
        outputRange: [0, 1],
        extrapolate: Animated.Extrapolate.CLAMP
      })
    }]}>
      <Surface
        backgroundTint={colors.primary}
        style={styles.header}
        innerStyle={styles.borderBottom}
        tint='dark'
      >
        <Animated.View
          style={[styles.headerTitleWrap, {
            opacity: scrollY.interpolate({
              inputRange: [offset, offset+  75],
              outputRange: [0, 1],
              extrapolate: Animated.Extrapolate.CLAMP
            }),
          }]}
        >
          <Text style={styles.headerText}>{title}</Text>
        </Animated.View>
        <Animated.View
          style={{
            opacity: scrollY.interpolate({
              inputRange: [offset, offset + 75],
              outputRange: [0, 1],
              extrapolate: Animated.Extrapolate.CLAMP
            }),
          }}
        >
          <Drawer.Button/>
        </Animated.View>
      </Surface>
    </Animated.View>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  headerWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 56 + theme.statusBarHeight
  },
  header: {
    flex: 1,
    paddingTop: theme.statusBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  borderBottom: {
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.divider
  },
  headerTitleWrap: {
    position: 'absolute',
    top: theme.statusBarHeight,
    left: theme.spacing(2),
    right: theme.spacing(2),
    bottom: 0,
    justifyContent: 'center'
  },
  headerText: {
    textAlign: Platform.select({
      default: 'left',
      ios: 'center'
    }),
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  }
}));

Header.useHeight = useHeight;
Header.ScrollSpacer = ScrollSpacer;
Header.Animated = AnimatedHeader;
export default Header;