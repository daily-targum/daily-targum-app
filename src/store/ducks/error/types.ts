const DISPLAY_ERROR = 'DISPLAY_ERROR';
const CLEAR_ERROR = 'CLEAR_ERROR';

export default {
  DISPLAY_ERROR,
  CLEAR_ERROR
}

export interface State {
  error: string | null
}