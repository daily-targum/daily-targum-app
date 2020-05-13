import reducer from './reducer';
import * as themeActions from "./actions";
import { useSelector } from 'react-redux';
import { State } from './types';

export function useThemeSelector<R>(
  selector: (state: Readonly<State>) => R,
  equalityFn?: (left: R, right: R) => boolean
): R {
  return useSelector((s: any) => selector(s.theme), equalityFn);
}
export { themeActions };
export default reducer;