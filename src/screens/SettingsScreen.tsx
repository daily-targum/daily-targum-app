import React, { useRef } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Switch } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { themeActions, useThemeSelector } from '../store/ducks/theme';
import { notificationActions, useNotificationsSelector } from '../store/ducks/notifications';
import Header from '../navigation/Header';
import Footer from '../navigation/BottomTabBar';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { Theme, ConsecutiveTouchable, Section, Divider } from '../components';
import { isBeta } from '../utils';

function SettingsScreen() {
  const {dark, systemWideDarkMode} = Theme.useTheme();
  const notificationsHasPermission = useNotificationsSelector(s => s.hasPermission);
  const notificationsEnabled = useNotificationsSelector(s => s.enabled);
  const useDeviceSettings = useThemeSelector(s => s.useDeviceSettings);
  const darkModeOverride = useThemeSelector(s => s.darkModeOverride);
  const dispatch = useDispatch();
  const styles = Theme.useStyleCreator(styleCreator);
  const navigation = useNavigation();
  const [devMode, setDevMode] = React.useState(isBeta() || __DEV__);

  const contentInsets = {
    top: Header.useHeight({ safe: false }),
    bottom: Footer.useHeight({ safe: false })
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
      indicatorStyle={dark ? 'white' : 'black'}
      testID='SettingsScreen'
    >
      <Header.ScrollSpacer/>

      <Section>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.row}>
          <Text>Push notifications</Text>
          <Switch
            value={notificationsEnabled && !!notificationsHasPermission}
            onValueChange={() => {
              dispatch(notificationActions.toggleNotifications({force: true}))
            }}
          />
        </View>
      </Section>

      <Divider/>

      <Section>
        <Text style={styles.sectionTitle}>Theme</Text>
        <View style={styles.row}>
          <Text>Dark mode</Text>
          <Switch
            value={useDeviceSettings ? systemWideDarkMode : darkModeOverride }
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
              dispatch(themeActions.toggleDarkMode(systemWideDarkMode));
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

      <Footer.ScrollSpacer/>
    </ScrollView>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
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

export default SettingsScreen;
