let enabled = true;

export const setEnabled = (val: boolean) => enabled = val;
export const canOpenURL = jest.fn(() => enabled);
export const openURL = jest.fn();
export const makeUrl = () => 'exp://localhost/--/';