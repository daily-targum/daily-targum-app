import React from 'react';
import themeReducer, { themeActions, useThemeSelector } from '../ducks/theme';
import { mockInitialState, unmockInitialState } from '../ducks/theme/reducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

describe('theme', () => {

  afterEach(() => {
    unmockInitialState();
  });

  it('patchReducer()', () => {
    mockInitialState({});
    const store = createStore(combineReducers({
      theme: themeReducer
    }), applyMiddleware(thunk));
    expect(store.getState().theme.useDeviceSettings).toBe(undefined);
    store.dispatch(themeActions.patchReducer());
    expect(store.getState().theme.useDeviceSettings).toBe(true);
  });

  it('toggleDarkMode()', () => {
    const store = createStore(combineReducers({
      theme: themeReducer
    }), applyMiddleware(thunk));
    expect(store.getState().theme.darkModeOverride).toBe(false);
    store.dispatch(themeActions.toggleDarkMode());
    expect(store.getState().theme.darkModeOverride).toBe(true);
  });

  it('toggleUseDeviceSettings()', () => {
    const store = createStore(combineReducers({
      theme: themeReducer
    }), applyMiddleware(thunk));
    expect(store.getState().theme.useDeviceSettings).toBe(true);
    store.dispatch(themeActions.toggleUseDeviceSettings());
    expect(store.getState().theme.useDeviceSettings).toBe(false);
  });

  it('useThemeSelector', () => {
    const store = createStore(combineReducers({
      theme: themeReducer
    }), applyMiddleware(thunk));
    let state;
    function ReadContext() {
      state = useThemeSelector(s => s);
      return null;
    }
    renderer.create(
      <Provider store={store}>
        <ReadContext/>
      </Provider>
    );
    expect(state).toBe(store.getState().theme);
  });

});
