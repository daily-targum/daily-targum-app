import React, {useRef} from 'react';
import { View, ScrollView, Clipboard, Alert } from 'react-native';
import Constants from 'expo-constants';
import { Theme, Section, Text, Divider, Button } from '../components';
import Header from '../navigation/Header';
import BottomTabBar from '../navigation/BottomTabBar';
import { useScrollToTop, useNavigation } from '@react-navigation/native';
import { styleHelpers } from '../utils';
import { StackActions } from '@react-navigation/native';
import { useSelector } from '../store';

function format(str: string) {
  const output =  str.replace(/([A-Z])/, ' $1');
  return output.charAt(0).toUpperCase() + output.slice(1);
}

export function Developer() {
  const {dark} = Theme.useTheme();
  const notificationsToken = useSelector(s => s.notifications.token);
  const styles = Theme.useStyleCreator(styleCreator);
  const navigation = useNavigation();
  const contentInsets = {
    top: Header.useHeight({ safe: false }),
    bottom: BottomTabBar.useHeight({ safe: false })
  };

  const ref: any = useRef();
  useScrollToTop(React.useRef({
    scrollToTop: () => ref.current?.scrollToOffset({ offset: -contentInsets.top }),
  }));
  
  let pushNotifications: any = {
    'Push Token': notificationsToken
  };

  let constants: any = {};
  Object.keys(Constants).map(key => {
    if(typeof Constants[key] === 'string') {
      constants[format(key)] = Constants[key];
    }
  });

  let manifest: any = {};
  Object.keys(Constants.manifest).map(key => {
    if(typeof Constants.manifest[key] === 'string') {
      manifest[format(key)] = Constants.manifest[key];
    }
  });
  
  let platform: any = {};
  if(Constants.platform?.ios) {
    Object.keys(Constants.platform.ios).map(key => {
      if(typeof Constants?.platform?.ios?.[key] === 'string') {
        platform[format(key)] = Constants.platform.ios[key];
      }
    });
  }
  if(Constants.platform?.android) {
    Object.keys(Constants.platform.android).map(key => {
      if(typeof Constants?.platform?.android?.[key] === 'string') {
        platform[format(key)] = Constants[key];
      }
    });
  }

  function handleTouch(value: string) {
    if(value.length > 15) {
      Alert.alert('Copied!', value);
      Clipboard.setString(value);
    }
  }

  return (
    <View
      style={styles.container}
    >
      <Header.ScrollSpacer/>
      <ScrollView 
        ref={ref}
        contentInset={contentInsets}
        contentOffset={{
          y: -contentInsets.top,
          x: 0
        }}
        contentInsetAdjustmentBehavior="always"
        indicatorStyle={dark ? 'white' : 'black'}
        testID='SettingsScreen'
      >

        <Section style={styles.section}>
          <Text style={styles.sectionTitle}>Tools</Text>
          <View 
            style={styles.row}
          >
            <Text 
              style={styles.cellLeft}
              numberOfLines={1}
            >Test Deep Links</Text>
            <Button.Link 
              style={styles.cellRight}
              textStyle={{textAlign: 'right'}}
              onPress={() => {
                navigation.dispatch(
                  StackActions.push('Page', { slug: 'debug' })
                )
              }}
            >
              Debug Screen
            </Button.Link>
          </View>
        </Section>

        <Divider/>

        <Section style={styles.section}>
          <Text style={styles.sectionTitle}>Constants</Text>
          {Object.keys(constants).map((key) => (
            <View 
              key={key} 
              style={styles.row}
            >
              <Text 
                style={styles.cellLeft}
                numberOfLines={1}
              >{key}</Text>
              <Text 
                style={styles.cellRight}
                numberOfLines={1} 
                onPress={() => handleTouch(constants[key])}
              >{constants[key]}</Text>
            </View>
          ))}
        </Section>

        {Object.keys(platform).length > 0 ? (
          <>
            <Divider/>
            <Section style={styles.section}>
              <Text style={styles.sectionTitle}>Manifest</Text>
              {Object.keys(manifest).map((key) => (
                <View 
                  key={key} 
                  style={styles.row}
                >
                  <Text 
                    style={styles.cellLeft}
                    numberOfLines={1}
                  >{key}</Text>
                  <Text 
                    style={styles.cellRight}
                    numberOfLines={1} 
                    onPress={() => handleTouch(manifest[key])}
                  >{manifest[key]}</Text>
                </View>
              ))}
            </Section>
          </>
        ) : null}

        {Object.keys(platform).length > 0 ? (
          <>
            <Divider/>
            <Section style={styles.section}>
              <Text style={styles.sectionTitle}>Platform</Text>
              {Object.keys(platform).map((key) => (
                <View 
                  key={key} 
                  style={styles.row}
                >
                  <Text 
                    style={styles.cellLeft}
                    numberOfLines={1}
                  >{key}</Text>
                  <Text 
                    style={styles.cellRight}
                    numberOfLines={1} 
                    onPress={() => handleTouch(platform[key])}
                  >{platform[key]}</Text>
                </View>
              ))}
            </Section>
          </>
        ) : null}

        <Divider/>
        <Section style={styles.section}>
          <Text style={styles.sectionTitle}>Push Nofications</Text>
          {Object.keys(pushNotifications).map((key) => (
            <View 
              key={key} 
              style={styles.row}
            >
              <Text 
                style={styles.cellLeft}
                numberOfLines={1}
              >{key}</Text>
              <Text 
                style={styles.cellRight}
                numberOfLines={1} 
                onPress={() => handleTouch(pushNotifications[key])}
              >{pushNotifications[key]}</Text>
            </View>
          ))}
        </Section>

      </ScrollView>
      <BottomTabBar.ScrollSpacer/>
    </View>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  container: {
    ...styleHelpers.container(theme)
  },
  section: {
    ...styleHelpers.page(theme)
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing(3.5)
  },
  cellLeft: {
    width: '50%'
  },
  cellRight: {
    width: '50%',
    textAlign: 'right',
    justifyContent: 'flex-end'
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
  }
}));

export default Developer;