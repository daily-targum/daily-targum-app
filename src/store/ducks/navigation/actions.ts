import { types } from './types';

function hideTabBar() {
  return {
    type: types.SET_TAB_BAR_VISIBLE,
    payload: false
  };
}

function showTabBar() {
  return {
    type: types.SET_TAB_BAR_VISIBLE,
    payload: true
  };
}

export {
  hideTabBar,
  showTabBar
};