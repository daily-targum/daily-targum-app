jest.mock('expo', () => ({
  Notifications: {
    getExpoPushTokenAsync: () => 'af9af098ga09wfppous'
  }
}));
jest.mock('../../shared/src/client/actions/notifications');

import React from 'react';
import notificationsReducer, { notificationActions, useNotificationsSelector } from '../ducks/notifications';
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
    store.dispatch(notificationActions.toggleNotifications({ force: false }));
    expect(store.getState().notifications.enabled).toBe(false);
    store.dispatch(notificationActions.toggleNotifications({ force: false }));
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
    store.dispatch(notificationActions.bootstrapPushNotifications({force: true}));
  });

  it('useNotificationSelector', () => {
    const store = createStore(combineReducers({
      notifications: notificationsReducer
    }), applyMiddleware(thunk));
    let state;
    function ReadContext() {
      state = useNotificationsSelector(s => s);
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
