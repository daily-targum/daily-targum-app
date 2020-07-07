import { Article } from '../../../shared/src/client';

export const types = {
  CATEGORY_REFRESHING: 'CATEGORY_REFRESHING',
  CATEGORY_SET: 'CATEGORY_SET',
  SET_REFRESH_ALL: 'SET_REFRESH_ALL',
  SAVE_SCROLL_INDEX: 'SAVE_SCROLL_INDEX'
};

export interface State {
  feed: {
    [key in string]: {
      data: Article[],
      refreshing: boolean,
      nextToken?: string | null,
      scrollIndex: 0
    }
  },
  refreshingAll: boolean,
  loading: boolean
}