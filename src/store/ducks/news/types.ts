const CATEGORY_REFRESHING = 'CATEGORY_REFRESHING';
const CATEGORY_SET = 'CATEGORY_SET';
const SET_REFRESH_ALL = 'SET_REFRESH_ALL';
const SAVE_SCROLL_INDEX = 'SAVE_SCROLL_INDEX';

export default {
  CATEGORY_REFRESHING,
  CATEGORY_SET,
  SET_REFRESH_ALL,
  SAVE_SCROLL_INDEX
};

export interface State {
  feed: {
    [key in string]: {
      data: any[],
      refreshing: boolean,
      nextToken?: string | null,
      scrollIndex: 0
    }
  },
  refreshingAll: boolean,
  loading: boolean
}