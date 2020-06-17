import React, { useRef } from 'react';
import { Linking } from 'expo';
import { Platform } from 'react-native';
import { NavigationContainer, useLinking, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon, Theme, ActivityIndicator } from '../components';
import { logger } from '../utils';
import { navigation } from '../constants';

// custom navigation components
import BottomTabBar from './BottomTabBar';
import Header from './Header';
import CustomDrawer from './Drawer';

// screens
import {
  SettingsScreen,
  ArticleScreen,
  CalendarScreen,
  ContentfulScreen,
  DeveloperScreen,
  HomeScreen,
  ArticleCategory
} from '../screens';



const HomeStack = createStackNavigator();
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator 
      screenOptions={{
        headerTransparent: true,
        header: (props) => <Header {...props}/>,
        cardStyle: {
          flex: 1
        }
      }}
    >
      <HomeStack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          headerRight: () => <CustomDrawer.Button/>,
          title: 'Home',
          header: () => null
        }}
      />
      <HomeStack.Screen name="Settings" component={SettingsScreen}/>
      <HomeStack.Screen name="Contact" children={() => (
        <ContentfulScreen title="Contact"/>
      )}/>
      <HomeStack.Screen name="About" children={() => (
        <ContentfulScreen title="About"/>
      )}/>
      <HomeStack.Screen name="Developer" component={DeveloperScreen}/>
      <HomeStack.Screen 
        name="ArticleCategory" 
        component={ArticleCategory} 
        options={({ route }: { route: any }) => ({ title: route.params.title })}
      />
    </HomeStack.Navigator>
  );
}


const CalendarStack = createStackNavigator();
const CalendarStackNavigator = () => {
  return (
    <CalendarStack.Navigator
      screenOptions={{ 
        header: () => null,
        headerTransparent: true 
      }}
    >
      <CalendarStack.Screen name="Calendar" component={CalendarScreen}/>
    </CalendarStack.Navigator>
  );
}




const BottomTab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator tabBar={(props) => <BottomTabBar {...props}/>}>
      <BottomTab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Icon size={size*1.6} focused={focused} name='home'/>
          ),
        }}
      />
      <BottomTab.Screen
        name="Calendar"
        component={CalendarStackNavigator}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Icon size={size*1.6} focused={focused} name='calendar'/>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}



const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerType={navigation.drawer.type}
      drawerContent={() => <CustomDrawer/>}
    >
      <Drawer.Screen name="App" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
}



const AppStack = createStackNavigator();
const AppStackNavigator = () => {
  const {colors} = Theme.useTheme();
  return (
    <AppStack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.background
        }
      }}
      headerMode='none'
      mode='modal'
    >
      <AppStack.Screen name="App" component={DrawerNavigator}/>
      <AppStack.Screen name="Article" component={ArticleScreen.GraphQL}/>
      <AppStack.Screen name="Preview" component={ArticleScreen.Contentful}/>
    </AppStack.Navigator>
  );
}



const prefixes = [
  Linking.makeUrl('/'),
  Linking.makeUrl(''),
  'https://daily-targum-website.now.sh'
];

export default () => {
  const ref = useRef<NavigationContainerRef>(null);
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  if(Platform.OS !== 'web') {
    const {getInitialState}: {getInitialState: () => any} = useLinking(ref, {
      prefixes,
      config: {
        Preview: {
          path: 'preview/:id',
          parse: {
            id: String,
          },
        }
      },
    });

    React.useEffect(() => {
      let isCancled = false;
      getInitialState()
      .catch((err: any) => {
        logger.logError(err);
      })
      .then((state: any) => {
        if(!isCancled) {
          if (state !== undefined) {
            setInitialState(state);
          }
          setIsReady(true);
        }
      });
      return () => {
        isCancled = true;
      }
    }, [getInitialState]);

    if (!isReady) {
      return null;
    }
  }

  return (
    <React.Suspense fallback={<ActivityIndicator.Screen/>}>
      <NavigationContainer initialState={initialState} ref={ref}>
        <AppStackNavigator/>
      </NavigationContainer>
    </React.Suspense>
  );
}