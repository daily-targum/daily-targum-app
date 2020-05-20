import { store } from './store';
import { notificationActions } from './ducks/notifications';
import { newsActions } from './ducks/news';
import { themeActions } from './ducks/theme';

/**
 * This gests run once on app startup
 */
export function onAppStart() {
  // store.dispatch(notificationActions.bootstrapPushNotifications({}));
  store.dispatch(themeActions.patchReducer());
}

/**
 * This gets run on app startup
 * but also whenever the app
 * is brought to the forgound
 */
export function onAppForgound() {
  store.dispatch(newsActions.refreshAll({
    quietly: true
  }));
}