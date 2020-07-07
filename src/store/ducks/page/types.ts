import { GetPage } from '../../../shared/src/client';

export const types = {
  LOAD_PAGE: 'LOAD_PAGE',
  SET_NOT_FOUND: 'SET_NOT_FOUND'
}

export interface State {
  items: {
    [key in string]: GetPage
  }
}