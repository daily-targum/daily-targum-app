import React, { useRef } from 'react';
import * as Linking from 'expo-linking'
import { Platform } from 'react-native';
import { NavigationContainer, useLinking, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon, Theme, ActivityIndicator } from '../components';
import { logger } from '../utils';
import { navigation } from '../constants';
import { hyphenatedToCapitalized } from '../shared/src/utils';

// custom navigation components
import BottomTabBar from './BottomTabBar';
import Header from './Header';
import CustomDrawer from './Drawer';

// screens
import * as Screens from '../screens';



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
        component={Screens.HomeScreen}
        options={{
          headerRight: () => <CustomDrawer.Button/>,
          title: 'Home',
          header: () => null
        }}
      />
      <HomeStack.Screen name="Settings" component={Screens.SettingsScreen}/>
      <HomeStack.Screen 
        name="Page" 
        component={Screens.PageScreen}
        options={({ route }: { route: any }) => ({ 
          title: hyphenatedToCapitalized(route.params.slug) 
        })}
      />
      <HomeStack.Screen name="Developer" component={Screens.DeveloperScreen}/>
      <HomeStack.Screen 
        name="ArticleCategory" 
        component={Screens.ArticleCategory} 
        options={({ route }: { route: any }) => ({ 
          title: hyphenatedToCapitalized(route.params.category) 
        })}
      />
      <HomeStack.Screen 
        name="Author" 
        component={Screens.Author} 
        options={({ route }: { route: any }) => ({ 
          title: hyphenatedToCapitalized(route.params.author) 
        })}
      />
      <AppStack.Screen name="NotFound" component={Screens.NotFound}/>
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
      <CalendarStack.Screen name="Calendar" component={Screens.CalendarScreen}/>
    </CalendarStack.Navigator>
  );
}




const BottomTab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator tabBar={(props) => <BottomTabBar {...props}/>}>
      <BottomTab.Screen
        name="HomeNavigator"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Icon size={size*1.6} focused={focused} name='home'/>
          ),
        }}
      />
      <BottomTab.Screen
        name="CalendarNavigator"
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
      <Drawer.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
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
      <AppStack.Screen name="DrawerNavigator" component={DrawerNavigator}/>
      <AppStack.Screen name="Article" component={Screens.ArticleScreen.GraphQL}/>
      <AppStack.Screen name="Preview" component={Screens.ArticleScreen.Contentful}/>
    </AppStack.Navigator>
  );
}



const prefixes = [
  Linking.makeUrl('/'),
  Linking.makeUrl(''),
  'https://dailytargum.now.sh'
];

export default () => {
  const ref = useRef<NavigationContainerRef>(null);
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  if(Platform.OS !== 'web') {
    const { getInitialState } = useLinking(ref, {
      prefixes,
      config: {
        initialRouteName: 'DrawerNavigator',
        screens: {
          initialRouteName: 'BottomTabNavigator',
          DrawerNavigator: {
            screens: {
              BottomTabNavigator: {
                initialRouteName: 'HomeNavigator',
                screens: {
                  HomeNavigator: {
                    initialRouteName: 'Home',
                    screens: {
                      ArticleCategory: {
                        path: 'section/:category',
                        parse: {
                          category: String
                        },
                      },
                      Page: {
                        path: 'page/:slug',
                        parse: {
                          slug: String,
                        },
                      },
                      NotFound: '*'
                    }
                  }
                }
              }
            }
          },
          Preview: {
            path: 'preview/:id',
            parse: {
              id: String,
            },
          },
          Article: {
            path: 'article/:year/:month/:slug',
            parse: {
              year: String,
              month: String,
              slug: String
            },
          }
        }
      },
    });

    React.useEffect(() => {
      let isCancled = false;
      getInitialState()
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