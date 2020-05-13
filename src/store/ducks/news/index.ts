import reducer from './reducer';
import * as newsActions from "./actions";
import { useSelector } from 'react-redux';
import { State } from './types';

export function useNewsSelector<R>(
  selector: (state: Readonly<State>) => R,
  equalityFn?: (left: R, right: R) => boolean
): R {
  return useSelector((s: any) => selector(s.news), equalityFn);
}
export { newsActions };
export default reducer;