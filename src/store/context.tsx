import React from 'react';
import { Provider as ReduxProvider, useSelector as useSelectorDefault, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import * as eventHandlers from './eventHandlers';
import { useFreshContent } from '../utils';
import { CombinedState } from './types';

export function Provider({
  children
}: {
  children: React.ReactNode
}) {
  React.useEffect(() => {
    eventHandlers.onAppStart();
  }, []);

  useFreshContent(() => {
    eventHandlers.onAppForgound();
  }, []);

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </ReduxProvider>
  );
}

export function useSelector<R>(
  selector: (state: Readonly<CombinedState>) => R,
  equalityFn?: (left: R, right: R) => boolean
) {
  return useSelectorDefault<CombinedState, R>(s => selector(s), equalityFn);
}

export { useDispatch };