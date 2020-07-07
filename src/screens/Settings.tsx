import React, { useRef } from 'react';
import { View, ScrollView } from 'react-native';
import { themeActions } from '../store/ducks/theme';
import { notificationsActions } from '../store/ducks/notifications';
import { useSelector, useDispatch } from '../store';
import Header from '../navigation/Header';
import BottomTabBar from '../navigation/BottomTabBar';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { Theme, ConsecutiveTouchable, Section, Divider, Text, Switch } from '../components';
import { isBeta, styleHelpers } from '../utils';

export function Settings() {
  const theme = Theme.useTheme();
  const notificationsHasPermission = useSelector(s => s.notifications.hasPermission);
  const notificationsEnabled = useSelector(s => s.notifications.enabled);
  const useDeviceSettings = useSelector(s => s.theme.useDeviceSettings);
  const darkModeOverride = useSelector(s => s.theme.darkModeOverride);
  const dispatch = useDispatch();
  const styles = Theme.useStyleCreator(styleCreator);
  const navigation = useNavigation();
  const [devMode, setDevMode] = React.useState(isBeta() || __DEV__);

  const contentInsets = {
    top: Header.useHeight({ safe: false }),
    bottom: BottomTabBar.useHeight({ safe: false })
  };

  const ref: any = useRef();
  useScrollToTop(React.useRef({
    scrollToTop: () => ref.current?.scrollToOffset({ offset: -contentInsets.top }),
  }));

  return (
    <ScrollView
      ref={ref}
      style={styles.container}
      contentInset={contentInsets}
      contentOffset={{
        y: -contentInsets.top,
        x: 0
      }}
      contentInsetAdjustmentBehavior="always"
      indicatorStyle={theme.dark ? 'white' : 'black'}
      testID='SettingsScreen'
    >
      <Header.ScrollSpacer/>

      <Section style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.row}>
          <Text>Push notifications</Text>
          <Switch
            value={notificationsEnabled && !!notificationsHasPermission}
            onValueChange={() => {
              dispatch(notificationsActions.toggleNotifications({force: true}))
            }}
          />
        </View>
      </Section>

      <Divider/>

      <Section style={styles.section}>
        <Text style={styles.sectionTitle}>Theme</Text>
        <View style={styles.row}>
          <Text>Dark mode</Text>
          <Switch
            value={useDeviceSettings ? theme.systemWideDarkMode : darkModeOverride }
            onValueChange={(val) => {
              dispatch(themeActions.toggleDarkMode(val));
              dispatch(themeActions.toggleUseDeviceSettings(false));
            }}
          />
        </View>
        <View style={styles.row}>
          <Text>Use device settings</Text>
          <Switch
            value={useDeviceSettings}
            onValueChange={() => {
              dispatch(themeActions.toggleUseDeviceSettings());
              dispatch(themeActions.toggleDarkMode(theme.systemWideDarkMode));
            }}
          />
        </View>
      </Section>

      <Divider/>

      <ConsecutiveTouchable 
        onPress={() => {
          setDevMode(true);
          navigation.navigate('Developer');
        }}
        requiredTaps={devMode ? 3 : 20}
      >
        <Text 
          style={styles.copyright}
        >All Rights Reserved{'\n'}© 2020 The Daily Targum</Text>
      </ConsecutiveTouchable>

      <BottomTabBar.ScrollSpacer/>
    </ScrollView>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  container: {
    ...styleHelpers.container(theme)
  },
  section: {
    ...styleHelpers.page(theme)
  },
  spacer: {
    height: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing(2)
  },
  sectionTitle: {
    color: '#888',
    fontSize: 14,
    fontWeight: '500'
  },
  infoText: {
    flex: 1,
    textAlign: 'right',
    alignSelf: 'center'
  },
  copyright: {
    textAlign: 'center',
    color: theme.colors.textMuted,
    padding: theme.spacing(2),
    lineHeight: 20,
    opacity: 0.5
  }
}));

export default Settings;