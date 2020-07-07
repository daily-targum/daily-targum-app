import { types } from './types';
import { Platform } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { actions } from '../../../shared/src/client';
import { logger, confirmationPrompt } from '../../../utils';
// @ts-ignore
import NotificationSetting from 'react-native-open-notification';


function getNotificationPermission({
  force = false
}: { 
  force: boolean 
}): any {
  return async (dispatch: any, getState: any): Promise<boolean> => {

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('news', {
        name: 'News',
        sound: false
      });
      return true;
    } 
    
    else {
      const { notifications } = getState();
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

      let finalStatus = existingStatus;

      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (force || (existingStatus === 'undetermined' && notifications.autoPrompt)) {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const promptConfig = {
          title: 'Push Notifications',
          msg: 'Want to be notified when new articles come out?'
        };
        if(force || await confirmationPrompt(promptConfig)) {
          try {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
          } catch(err) {
            logger.logError(err);
            return false;
          }
        }
        dispatch({
          type: types.AUTO_PROMPT_DISABLE
        });
      }

      if (finalStatus !== 'granted') {
        return false;
      }

      return true;
    }
  };
}


function bootstrapPushNotifications({
  force = false
}: { 
  force?: boolean 
}): any {
  return async (dispatch: any, getState: any): Promise<void> => {
    const { notifications } = getState();

    // app has notification permission
    const hasPermission = await dispatch(getNotificationPermission({ force }));
    if(hasPermission) {
      let token;
      try {
        token = await Notifications.getExpoPushTokenAsync();
      } catch(err) {
        logger.logError(err);
        return;
      }

      dispatch({
        type: types.HAS_PERMISSION_SET,
        payload: true
      });
      dispatch({
        type: types.TOKEN_SET,
        payload: token
      });

      const pref = notifications.enabled ? 1 : 0;

      actions.updateDevice({
        pushToken: token,
        pref,
        os: Platform.OS
      });
    }

    // app does not have notification permission
    // but it used to have notification permission
    else if(notifications.token) {
      dispatch({
        type: types.HAS_PERMISSION_SET,
        payload: false
      });

      actions.updateDevice({
        pushToken: notifications.token,
        pref: 0,
        os: Platform.OS
      });
    }

    // app doesn't have notification permissions
    if(force && !hasPermission) {
      const promptConfig = {
        title: 'Enable Notifications',
        msg: 'Open Settings App to enable notifications',
        cancel: 'Later',
        confirm: 'Open'
      };
      if(await confirmationPrompt(promptConfig)) {
        NotificationSetting.open();
      }
    }
  };
}

function toggleNotifications({
  force = false
}: { 
  force: boolean 
}): any {
  return (dispatch: any, getState: any): void => {
    const {notifications} = getState();
    const enabled = !notifications.enabled;
    if(notifications.hasPermission) {
      dispatch({
        type: types.ENABLED_SET,
        payload: enabled
      });
    }
    dispatch(bootstrapPushNotifications({ force }));
  };
}


export {
  getNotificationPermission,
  bootstrapPushNotifications,
  toggleNotifications
};