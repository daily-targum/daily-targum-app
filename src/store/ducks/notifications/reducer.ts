import types, { State } from "./types";

export const INITIAL_STATE: State = {
  token: '',
  hasPermission: null,
  enabled: true,
  autoPrompt: true
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
    case types.TOKEN_SET:
      return {
        ...state,
        token: action.payload
      };
    case types.HAS_PERMISSION_SET:
      return {
        ...state,
        hasPermission: action.payload
      };
    case types.ENABLED_SET:
      return {
        ...state,
        enabled: action.payload
      };
    case types.AUTO_PROMPT_DISABLE:
      return {
        ...state,
        autoPrompt: false
      };
    default:
      return state;
  }
}