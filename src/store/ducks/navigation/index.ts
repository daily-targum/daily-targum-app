import React from 'react';
import { useIsFocused } from '@react-navigation/native';
import reducer from './reducer';
import * as navigationActions from "./actions";
import { useDispatch } from 'react-redux';

export { navigationActions };
export default reducer;

export function useHideBottomTabBar() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      dispatch(navigationActions.hideTabBar());
    } else {
      dispatch(navigationActions.showTabBar());
    }
    
    return () => {
      dispatch(navigationActions.showTabBar());
    };
  }, [isFocused]);

}