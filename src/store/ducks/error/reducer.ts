import { types, State } from './types';

const initialState: State = {
  error: null
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case types.DISPLAY_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case types.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}