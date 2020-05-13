
let status = 'undetermined';

export const askAsync = () => {
  status = 'granted';
  return {
    status
  };
};

export const getAsync = () => status;