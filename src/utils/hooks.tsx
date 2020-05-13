import React from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { AppState, AppStateStatus, Platform } from 'react-native';
import dayjs from 'dayjs';

export function useConnection(
  fn: (state: NetInfoState) => any,
  deps?: React.DependencyList
) {
  React.useEffect(() => {
    if(Platform.OS !== 'web') {
      const unsubscribe = NetInfo.addEventListener(state => fn(state));
      return () => unsubscribe();
    }
  }, deps);
  if(Platform.OS === 'web') return true;
}


export function useAppStateChange(
  fn: (state: AppStateStatus) => any,
  deps?: React.DependencyList
) {
  React.useEffect(() => {
    const onAppStateChange = (state: AppStateStatus) => fn(state);
    AppState.addEventListener('change', onAppStateChange);
    return () => AppState.removeEventListener('change', onAppStateChange);
  }, deps);
}


export function useInterval(
  callback: () => any, 
  delay: number
) {
  const savedCallback = React.useRef<any>();

  React.useEffect(() => {
    savedCallback.current = callback;
  });

  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}



export function useDate(
  accuracy: 'second' | 'minute'
): dayjs.Dayjs {
  const [date, setDate] = React.useState(dayjs());
  const [key, setKey] = React.useState(0);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    const timeout = setTimeout(() => {
      // start interval synced with second
      interval = setInterval(
        () => setDate(dayjs()), 
        accuracy === 'minute' ? 60 * 1000 : 1000
      );
    }, 1000 - new Date().getMilliseconds());
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    }
  }, [key]);

  // update date incase setInterval 
  // drifts while app is in the background
  useAppStateChange(state => {
    if(state === 'active') setKey(key+1);
  }, []);
  return date;
}


export function useFreshContent(
  fn: () => any,
  deps?: React.DependencyList,
  // default value is 10 minutes
  maxAge = 10 * 60 * 1000
) {
  let updatedAt = Date.now();
  React.useEffect(() => {
    // changing app state refreshes content
    const onAppStateChange = (state: AppStateStatus) => {
      if((Date.now() - updatedAt > maxAge) && state === 'active') {
        fn();
        updatedAt = Date.now();
      }
    }
    AppState.addEventListener('change', onAppStateChange);
    // update content when app phone establishes internet connection
    let unsubscribe = () => {};
    if(Platform.OS !== 'web') {
      unsubscribe = NetInfo.addEventListener(state => {
        if((Date.now() - updatedAt > maxAge) && state.isConnected) {
          fn();
          updatedAt = Date.now();
        }
      });
    }
    fn();
    return () => {
      AppState.removeEventListener('change', onAppStateChange);
      unsubscribe();
    };
  }, deps);
}