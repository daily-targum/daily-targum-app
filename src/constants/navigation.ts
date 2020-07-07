import { Platform } from 'react-native';
import * as Linking from 'expo-linking';

const prefixes = [
  Linking.makeUrl('/'),
  Linking.makeUrl(''),
  'https://dailytargum.now.sh'
];

const deepLinkConfig = {
  initialRouteName: 'BottomTabNavigator',
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
            },
            NotFound: '*'
          }
        }
      }
    }
  }
}

export const deepLink = {
  prefixes,
  config: deepLinkConfig
}

const DEFAULTS: navigation = {
  materialTopTabBar: {
    height: 92
  },
  bottomTabBar: {
    /**
     * extra space for notch added to this number
     */
    height: 48
  },
  drawer: {
    type: 'slide'
  }
};

export const navigation = Platform.select<navigation>({
  android: {
    ...DEFAULTS,
    drawer: {
      ...DEFAULTS.drawer,
      type: 'front'
    }
  },
  default: {
    ...DEFAULTS
  }
});

type navigation = {
  materialTopTabBar: {
    height: number
  },
  bottomTabBar: {
    height: number
  },
  drawer: {
    type: 'slide' | 'front' | 'back'
  }
};