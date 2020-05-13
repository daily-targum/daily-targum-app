import types from './types';

function displayError({
  error
}: {
  error: string
}): any {
  return {
    type: types.DISPLAY_ERROR,
    payload: error
  };
}

function clearError(): any {
  return {
    type: types.CLEAR_ERROR
  };
}

export {
  displayError,
  clearError
};