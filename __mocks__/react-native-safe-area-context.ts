import { EdgeInsets } from 'react-native-safe-area-context';

const insets: EdgeInsets = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

export const useSafeArea = (): EdgeInsets => insets;

// export const SafeAreaConsumer = ({ children }) => {
//   return children(insets);
// };