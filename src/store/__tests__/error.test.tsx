import React from 'react';
import errorReducer, { errorActions } from '../ducks/error';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

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

});
