import { AppLoading } from 'expo';
import React, { useState } from 'react';
import { StyleSheet, View, YellowBox, StatusBar } from 'react-native';
// import * as Font from 'expo-font';
import { Theme, ErrorAppBar } from './src/components';
import { logger, useAppStateChange, isBeta } from './src/utils';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ReduxProvider from './src/store/Provider';
import { Navigator } from './src/navigation';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Updates from 'expo-updates';

// THIS IS A HACK!!! REMOVE THIS!
YellowBox.ignoreWarnings(['Warning: RNCNetInfo', 'Require cycles are allowed']);


export default function App({
  skipLoadingScreen
}: {
  skipLoadingScreen: boolean
}) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

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

  if (!isLoadingComplete && !skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={completeAsyncTasks}
        onError={error => logger.logError(error)}
        onFinish={() => setLoadingComplete(true)}
      />
    );
  } else {
    return (
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
    );
  }
}

async function completeAsyncTasks() {
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
