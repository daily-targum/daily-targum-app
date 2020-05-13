import { Platform } from 'react-native';

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

export default Platform.select<navigation>({
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