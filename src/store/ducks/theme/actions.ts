import { types } from './types';

function toggleDarkMode(val?: boolean): any {
  return (dispatch: any, getState: any) => {
    const { theme } = getState();
    dispatch({
      type: types.SET_DARK_MODE_OVERRIDE,
      payload: typeof val !== 'undefined' ? val : !theme.darkModeOverride
    });
  };
}

function toggleUseDeviceSettings(val?: boolean): any {
  return (dispatch: any, getState: any) => {
    const { theme } = getState();
    dispatch({
      type: types.SET_USE_DEVICE_SETTINGS,
      payload: typeof val !== 'undefined' ? val : !theme.useDeviceSettings
    });
  };
}

function patchReducer(): any {
  return (dispatch: any, getState: any) => {
    const { theme } = getState();
    // since useDeviceSettings was is a
    // newer feature added, and this
    // reducer is persistent, this function
    // is required for backwards compatibility
    if(typeof theme.useDeviceSettings === 'undefined') {
      dispatch(toggleUseDeviceSettings(true))
    }
  };
}

export {
  toggleDarkMode,
  toggleUseDeviceSettings,
  patchReducer
};