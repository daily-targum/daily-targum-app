import React, { useRef } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer, useLinking, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon, ActivityIndicator, StatusBar } from '../components';
import { navigation, deepLink } from '../constants/navigation';
import { hyphenatedToCapitalized } from '../shared/src/utils';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { forFade } from './transitions';

// custom navigation components
import BottomTabBar from './BottomTabBar';
import Header from './Header';
import CustomDrawer from './Drawer';

// screens
import * as Screens from '../screens';


const HomeStack = createSharedElementStackNavigator();
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
        component={Screens.Home}
        options={{
          headerRight: () => <CustomDrawer.Button/>,
          title: 'Home',
          header: () => null
        }}
      />
      <HomeStack.Screen 
        name="Article" 
        component={Screens.Article}
        options={{
          header: () => null,
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardStyle: { 
            backgroundColor: 'transparent'
          },
          cardOverlayEnabled: true,
          cardStyleInterpolator: forFade
        }}
        sharedElementsConfig={(route, otherRoute, showing) => {
          return [
            {
              id: `card.${route.params.id}.image`,
              align: 'center-bottom',
              resize: 'stretch'
            }, 
            {
              id: `card.${route.params.id}.overlay`,
              animation: 'fade'
            },
            {
              id: `card.${route.params.id}.title`,
              animation: 'fade',
              resize: 'clip',
              align: 'left-top'
            },
            {
              id: `card.${route.params.id}.date`,
              animation: 'fade',
              resize: 'clip',
              align: 'left-top'
            },
            {
              id: `article.closeIcon`,
              animation: 'fade'
            }
          ];
        }}
      />
      <HomeStack.Screen 
        name="Preview" 
        component={Screens.Article.Preview}
        options={{
          header: () => null
        }}
      />
      <HomeStack.Screen name="Settings" component={Screens.Settings}/>
      <HomeStack.Screen 
        name="Page" 
        component={Screens.Page}
        options={({ route }: { route: any }) => ({ 
          title: hyphenatedToCapitalized(route.params.slug) 
        })}
      />
      <HomeStack.Screen name="Developer" component={Screens.Developer}/>
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
          title: hyphenatedToCapitalized(route.params.author),
          cardStyle: { 
            backgroundColor: 'transparent'
          },
          cardOverlayEnabled: true
        })}
        sharedElementsConfig={(route, otherRoute, showing) => {
          return otherRoute.name !== 'Article' ? [
            {
              id: `card.${otherRoute.params.id}.image`,
              align: 'center-bottom',
              resize: 'stretch'
            }, 
            {
              id: `card.${otherRoute.params.id}.overlay`,
              animation: 'fade'
            },
            {
              id: `card.${otherRoute.params.id}.title`,
              animation: 'fade',
              resize: 'clip',
              align: 'left-top'
            },
            {
              id: `card.${otherRoute.params.id}.date`,
              animation: 'fade',
              resize: 'clip',
              align: 'left-top'
            },
            {
              id: `article.closeIcon`,
              animation: 'fade'
            }
          ] : undefined;
        }}
      />
      <HomeStack.Screen 
        name="NotFound" 
        component={Screens.NotFound}
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
      <CalendarStack.Screen 
        name="Calendar" 
        component={Screens.Calendar}
      />
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
          )
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
      drawerContent={props => <CustomDrawer {...props}/>}
    > 
      <Drawer.Screen 
        name="BottomTabNavigator" 
        component={BottomTabNavigator} 
      />
    </Drawer.Navigator>
  );
}

export default () => {
  const ref = useRef<NavigationContainerRef>(null);
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  if(Platform.OS !== 'web') {
    const { getInitialState } = useLinking(ref, deepLink);

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
        <DrawerNavigator/>
      </NavigationContainer>
    </React.Suspense>
  );
}