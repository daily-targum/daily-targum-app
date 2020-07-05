import types, { State } from './types';

const INITIAL_STATE: State = {
  bottomTabBarVisible: true
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
    case types.SET_TAB_BAR_VISIBLE:
      return {
        ...state,
        bottomTabBarVisible: action.payload
      };
    default:
      return state;
  }
}
