import React from 'react';
import errorReducer, { errorActions, useErrorSelector } from '../ducks/error';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

describe('error duck', () => {

  it('initial state', () => {
    const store = createStore(combineReducers({
      error: errorReducer
    }), applyMiddleware(thunk));
    expect(store.getState().error.error).toBe(null);
  });

  it('actions', () => {
    const error = 'this is an error';
    const store = createStore(combineReducers({
      error: errorReducer
    }), applyMiddleware(thunk));
    store.dispatch(errorActions.displayError({error}))
    expect(store.getState().error.error).toBe(error);
    store.dispatch(errorActions.clearError());
    expect(store.getState().error.error).toBe(null);
  });

  it('useErrorSelector', () => {
    const store = createStore(combineReducers({
      error: errorReducer
    }), applyMiddleware(thunk));
    let state;
    function ReadContext() {
      state = useErrorSelector(s => s);
      return null;
    }
    renderer.create(
      <Provider store={store}>
        <ReadContext/>
      </Provider>
    );
    expect(state).toBe(store.getState().error);
  });

});
