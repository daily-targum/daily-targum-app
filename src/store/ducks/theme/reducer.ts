import { types, State } from './types';

const INITIAL_STATE: State = {
  darkModeOverride: false,
  useDeviceSettings: true
};

let initialState = INITIAL_STATE;
export function mockInitialState(init: any) {
  initialState = init;
}

export function unmockInitialState() {
  initialState = INITIAL_STATE;
}

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case types.SET_DARK_MODE_OVERRIDE:
      return {
        ...state,
        darkModeOverride: action.payload
      };
    case types.SET_USE_DEVICE_SETTINGS:
      return {
        ...state,
        useDeviceSettings: action.payload
      };
    default:
      return state;
  }
}
