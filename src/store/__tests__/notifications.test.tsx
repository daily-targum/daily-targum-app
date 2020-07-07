jest.mock('expo', () => ({
  Notifications: {
    getExpoPushTokenAsync: () => 'af9af098ga09wfppous'
  }
}));
jest.mock('../../shared/src/client/actions/notifications');

import React from 'react';
import notificationsReducer, { notificationsActions } from '../ducks/notifications';
import { useSelector } from '../context';
import { mockInitialState, unmockInitialState, INITIAL_STATE } from '../ducks/notifications/reducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

describe('notifications', () => {

  afterEach(() => {
    unmockInitialState();
  });

  it('toggleNotifications()', () => {
    mockInitialState({
      ...INITIAL_STATE,
      hasPermission: true,
    });
    const store = createStore(combineReducers({
      notifications: notificationsReducer
    }), applyMiddleware(thunk));
    expect(store.getState().notifications.enabled).toBe(true);
    store.dispatch(notificationsActions.toggleNotifications({ force: false }));
    expect(store.getState().notifications.enabled).toBe(false);
    store.dispatch(notificationsActions.toggleNotifications({ force: false }));
    expect(store.getState().notifications.enabled).toBe(true);
  });

  it('bootstrapPushNotifications()', async (done) => {
    mockInitialState({
      ...INITIAL_STATE,
      hasPermission: true,
    });
    const store = createStore(combineReducers({
      notifications: notificationsReducer
    }), applyMiddleware(thunk));
    store.subscribe(() => {
      const state = store.getState();
      if(state.notifications.hasPermission) {
        expect(state.notifications).toMatchObject({
          token: expect.any(String),
          hasPermission: true,
          enabled: true,
          autoPrompt: false
        });
        done();
      }
    });
    store.dispatch(notificationsActions.bootstrapPushNotifications({force: true}));
  });

  it('useSelector', () => {
    const store = createStore(combineReducers({
      notifications: notificationsReducer
    }), applyMiddleware(thunk));
    let state;
    function ReadContext() {
      state = useSelector(s => s.notifications);
      return null;
    }
    renderer.create(
      <Provider store={store}>
        <ReadContext/>
      </Provider>
    );
    expect(state).toBe(store.getState().notifications);
  });

});
