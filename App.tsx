import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Theme, ErrorAppBar } from './src/components';
import { logger, useAppStateChange, isBeta } from './src/utils';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ReduxProvider from './src/store/Provider';
import { store } from './src/store/store';
import { Navigator } from './src/navigation';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Updates from 'expo-updates';

const MAX_TIME_TO_WAIT_FOR_REDUX_TASKS_MS = 3 * 1000;

function App() {
  const [reduxLoaded, setReduxLoaded] = React.useState(false);
  const [startupTasksFinished, setStartupTasksFinished] = React.useState(false);

  // beta app attempts to update
  useAppStateChange(async (state) => {
    if(isBeta() && state === 'active') {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (e) {
        logger.logError(e);
      }
    }
  });

  React.useEffect(() => {
    async function start () {
      // Prevent native splash screen from autohiding
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
      await performStartupTasks();
      setStartupTasksFinished(true);
    }
    start();

    const unsubscribe = store.subscribe(() => {
      const { news } = store.getState();
      if (!news.loading) {
        setReduxLoaded(true);
        unsubscribe();
      }
    });

    const timeout = setTimeout(() => {
      setReduxLoaded(true);
      unsubscribe();
    }, MAX_TIME_TO_WAIT_FOR_REDUX_TASKS_MS);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    }
  }, []);

  React.useEffect(() => {
    if (startupTasksFinished && reduxLoaded) {
      SplashScreen.hideAsync();
    }
  }, [startupTasksFinished, reduxLoaded])

  return startupTasksFinished ? (
    <SafeAreaProvider>
      <ReduxProvider>
        <Theme.Provider>  
          <StatusBar animated={true} barStyle="light-content"/>
          <ErrorAppBar/>
          <View style={styles.container} testID='App'>
            <Navigator/>
          </View>
        </Theme.Provider>
      </ReduxProvider>
    </SafeAreaProvider>
  ) : null;
}

// Put any code you need to prepare your app in these functions
async function performStartupTasks() {
  await Promise.all([
    logger.initialize({}),
    lockOrientation()
  ]);
}

async function lockOrientation() {
  if(ScreenOrientation.supportsOrientationLockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)) {
    return ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  } 
  else if(ScreenOrientation.supportsOrientationLockAsync(ScreenOrientation.OrientationLock.PORTRAIT)) {
    return ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    flexDirection: 'row',
    height: '100%',
    maxHeight: '100%'
  }
});

export default App;