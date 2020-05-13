import reducer from './reducer';
import * as errorActions from "./actions";
import { useSelector } from 'react-redux';
import { State } from './types';

export function useErrorSelector<R>(
  selector: (state: Readonly<State>) => R,
  equalityFn?: (left: R, right: R) => boolean
): R {
  return useSelector((s: any) => selector(s.error), equalityFn);
}
export { errorActions };
export default reducer;