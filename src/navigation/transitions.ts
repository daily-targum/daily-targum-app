import { Animated } from 'react-native';

export const forFade = ({ current: { progress } }: any) => ({
  cardStyle: {
    opacity: progress.interpolate({
      inputRange: [0, 0.1, 1],
      outputRange: [0, 0, 1],
    }),
    // transform: [{ 
    //   translateY: progress.interpolate({
    //     inputRange: [0, 0.5, 1],
    //     outputRange: [0, -50, 0],
    //   }),
    // }] 
  },
  overlayStyle: {
    // opacity: progress.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [0, 0.2],
    //   extrapolate: 'clamp',
    // }),
    opacity: 0
  },
});