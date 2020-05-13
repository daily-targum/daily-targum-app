import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import * as eventHandlers from './eventHandlers';
import { useFreshContent } from '../utils';

function Provider({
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

export default Provider;