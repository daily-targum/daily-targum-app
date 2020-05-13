import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import * as reducers from "./ducks";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // specify what should be saved
  whitelist: ['theme', 'notifications', 'bookmark', 'page']
};

const reducer = persistCombineReducers(persistConfig, reducers);

export const store = createStore(reducer, applyMiddleware(thunk));
export const persistor = persistStore(store, {});
