export const types = {
  SET_DARK_MODE_OVERRIDE: 'SET_DARK_MODE_OVERRIDE',
  SET_USE_DEVICE_SETTINGS: 'SET_USE_DEVICE_SETTINGS'
};

export interface State {
  darkModeOverride: boolean,
  useDeviceSettings: boolean
}