import React from 'react';
import { StatusBar as DefaultStatusBar, StatusBarProps } from 'react-native';
import { useNavigateBackEffect } from '../utils';

export function StatusBar(props: StatusBarProps) {
  const [navigatingBack, setNavigatingBack] = React.useState(false);

  useNavigateBackEffect(() => {
    setNavigatingBack(true);
  }, []); 

  return !navigatingBack ? (
    <WithoutNavigation 
      animated={true} 
      showHideTransition='fade'
      barStyle="light-content"
      hidden={false}
      {...props}
    />
  ) : null;
}

function WithoutNavigation(props: StatusBarProps) {
  return (
    <DefaultStatusBar 
      animated={true} 
      showHideTransition='fade'
      barStyle="light-content"
      hidden={false}
      {...props}
    />
  );
}

StatusBar.WithoutNavigation = WithoutNavigation;
export default StatusBar;