import reducer from './reducer';
import * as pageActions from "./actions";
import { useSelector } from 'react-redux';
import { State } from './types';

export function usePageSelector<R>(
  selector: (state: Readonly<State>) => R,
  equalityFn?: (left: R, right: R) => boolean
): R {
  return useSelector((s: any) => selector(s.page), equalityFn);
}
export { pageActions };
export default reducer;