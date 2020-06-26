import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, TouchableHighlight, Platform } from 'react-native';
import { Theme, Icon, Divider, Text } from '../components';
import { FontAwesome } from '@expo/vector-icons';
import * as Linking from 'expo-linking'

function Link({
  to,
  children,
  icon,
  testID
}: {
  to: string,
  children: string,
  icon: string,
  testID: string
}) {
  const {colors} = Theme.useTheme();
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      style={{
        padding: 3,
        paddingLeft: 10
      }}
      onPress={() => navigation.navigate(to)}
      underlayColor='#333'
      testID={testID}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Icon
          color={colors.accent}
          name={icon}
          size={42}
        />
        <Text
          style={{
            fontSize: 20,
            color: colors.accent,
            marginLeft: 5
          }}
        >{children}</Text>
      </View>
    </TouchableHighlight>
  );
}

function Drawer() {
  const spacer = 75;
  const {colors} = Theme.useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1f1f21',
        paddingTop: spacer * 1.5,
        paddingBottom: spacer,
        ...Platform.select({
          android: {},
          default: {
            borderRightWidth: 0.5,
            borderRightColor: colors.divider
          }
        }),
        
      }}
      testID='Drawer'
    >
      <Link to='About' testID='Drawer-About' icon='about'>About</Link>
      <Link to='Contact' testID='Drawer-Contact' icon='contact'>Contact</Link>
      <Link to='Settings' testID='Drawer-Settings' icon='settings'>Settings</Link>

      <View style={{flex: 1}}/>

      <Divider/>
      <View
        style={{
          flexDirection: 'row',
          padding: 8,
          paddingTop: 16
        }}
      >
        <FontAwesome 
          name='twitter-square' 
          color='rgba(255,255,255,0.8)' 
          size={28}
          style={{marginLeft: 14}}
          onPress={() => Linking.openURL('https://twitter.com/Daily_Targum')}
        />
        <FontAwesome 
          name='facebook-square' 
          color='rgba(255,255,255,0.8)' 
          size={28}
          style={{marginLeft: 24}}
          onPress={() => Linking.openURL('https://www.facebook.com/thedailytargum/')}
        />
        <FontAwesome 
          name='instagram' 
          color='rgba(255,255,255,0.8)' 
          size={28}
          style={{marginLeft: 24}}
          onPress={() => Linking.openURL('https://www.instagram.com/dailytargum/')}
        />
      </View>

    </View>
  );
}

function Button() {
  const navigation: any = useNavigation();
  return (
    <Icon
      name='menu'
      testID='DrawerToggle'
      size={50}
      onPress={() => navigation.openDrawer()}
    />
  )
}

Drawer.Button = Button;
export default Drawer;