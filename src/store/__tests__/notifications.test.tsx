jest.mock('../../shared/src/client/actions/notifications');

import notificationsReducer, { notificationsActions } from '../ducks/notifications';
import { mockInitialState, unmockInitialState, INITIAL_STATE } from '../ducks/notifications/reducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

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

  // TODO: update when we switch to new expo notifications api

  // it('bootstrapPushNotifications()', async (done) => {
  //   mockInitialState({
  //     ...INITIAL_STATE,
  //     hasPermission: true,
  //   });

  //   const store = createStore(combineReducers({
  //     notifications: notificationsReducer
  //   }), applyMiddleware(thunk));

  //   store.subscribe(() => {
  //     const state = store.getState();
  //     if(state.notifications.hasPermission) {
  //       expect(state.notifications).toMatchObject({
  //         token: expect.any(String),
  //         hasPermission: true,
  //         enabled: true,
  //         autoPrompt: false
  //       });
  //       done();
  //     }
  //   });

  //   store.dispatch(notificationsActions.bootstrapPushNotifications({ force: true }));
  // });

});
