import { errorTypes, ErrorState } from './ducks/error';
import { newsTypes, NewsState } from './ducks/news';
import { navigationTypes, NavigationState } from './ducks/navigation';
import { notificationsTypes, NotificationsState } from './ducks/notifications';
import { themeTypes, ThemeState } from './ducks/theme';
import { pageTypes, PageState } from './ducks/page';
import { Reducer } from 'redux';

export type CombinedTypes = (
  keyof typeof newsTypes | 
  keyof typeof navigationTypes |
  keyof typeof errorTypes | 
  keyof typeof notificationsTypes |
  keyof typeof pageTypes |
  keyof typeof themeTypes
)

export type Action = {
  type: CombinedTypes,
  payload?: any
}

export type CombinedState = {
  error: ErrorState
  news: NewsState
  navigation: NavigationState
  notifications: NotificationsState
  page: PageState
  theme: ThemeState
}

export type CombinedReducers = {
  [key in keyof CombinedState]: CombinedState[key]
}