import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import thunk from 'redux-thunk';
import * as reducers from "./ducks";
import { CombinedReducers } from './types';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // specify what should be saved
  whitelist: ['theme', 'notifications', 'bookmark', 'page']
};

const reducer = persistCombineReducers<CombinedReducers>(persistConfig, reducers);

export const store = createStore(reducer, applyMiddleware(thunk));
export const persistor = persistStore(store, {});
