import React from 'react';
import { useSelector, Provider } from '../context';
import { store } from '../store';
import renderer from 'react-test-renderer';
import * as reducers from '../ducks';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import thunk from 'redux-thunk';

describe('store context', () => {

  it('<Provider/>', async (done) => {
    let state: any;
    function ReadContext() {
      state = useSelector(s => s.theme);
      expect(state).toBe(store.getState().theme);
      done();
      return null;
    }
    renderer.create(
      <Provider>
        <ReadContext/>
      </Provider>
    );

  });

  it('useselector', () => {
    const store = createStore(combineReducers(reducers), applyMiddleware(thunk));
    let state;
    function ReadContext() {
      state = useSelector(s => s);
      return null;
    }
    renderer.create(
      <ReduxProvider store={store}>
        <ReadContext/>
      </ReduxProvider>
    );
    expect(state).toBe(store.getState());
  });

});