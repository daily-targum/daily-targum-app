import types, { State } from './types';

const initialState: State = {
  feed: {
    'News': {
      data: [],
      refreshing: true,
      nextToken: '',
      scrollIndex: 0
    },
    'Sports': {
      data: [],
      refreshing: true,
      nextToken: '',
      scrollIndex: 0
    },
    'Opinions': {
      data: [],
      refreshing: true,
      nextToken: '',
      scrollIndex: 0
    },
    'inside-beat': {
      data: [],
      refreshing: true,
      nextToken: '',
      scrollIndex: 0
    }
  },
  refreshingAll: false,
  loading: true
};

export default function reducer(state = initialState, action: any) {
  const feed: any = Object.assign({}, state.feed);
  switch (action.type) {
    case types.CATEGORY_REFRESHING:
      feed[action.payload.category] = {
        ...feed[action.payload.category],
        refreshing: action.payload.manual
      };
      return {
        ...state,
        feed
      };
    case types.CATEGORY_SET:
      feed[action.payload.category] = {
        ...feed[action.payload.category],
        data: action.payload.data,
        refreshing: false,
        nextToken: action.payload.nextToken
      };
      return {
        ...state,
        feed
      };
    case types.SAVE_SCROLL_INDEX:
      feed[action.payload.category] = {
        ...feed[action.payload.category],
        scrollIndex: action.payload.scrollIndex
      };
      return {
        ...state,
        feed
      };
    case types.SET_REFRESH_ALL:
      return {
        ...state,
        refreshingAll: action.payload,
        loading: state.loading ? action.payload : false
      };
    default:
      return state;
  }
}