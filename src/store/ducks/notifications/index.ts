import reducer from './reducer';
import * as notificationActions from "./actions";
import { useSelector } from 'react-redux';
import { State } from './types';

export function useNotificationsSelector<R>(
  selector: (state: Readonly<State>) => R,
  equalityFn?: (left: R, right: R) => boolean
): R {
  return useSelector((s: any) => selector(s.notifications), equalityFn);
}
export { notificationActions };
export default reducer;