import { GetPage } from '../../../shared/src/client';

const LOAD_PAGE = 'LOAD_PAGE';
const SET_NOT_FOUND = 'SET_NOT_FOUND';

export default {
  LOAD_PAGE,
  SET_NOT_FOUND
}

export interface State {
  items: {
    [key in string]: GetPage
  }
}