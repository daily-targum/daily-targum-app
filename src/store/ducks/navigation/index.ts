import React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

export { default } from './reducer';
import * as navigationActions from "./actions";
export { navigationActions };
export { 
  types as navigationTypes, 
  State  as NavigationState
} from './types';


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