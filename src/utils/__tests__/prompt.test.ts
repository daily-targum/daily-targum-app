import { confirmationPrompt } from '../prompt';
import { Alert } from 'react-native';
jest.spyOn(Alert, 'alert');

describe('prompt', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('confirmationPrompt default confirm and cancel', () => {
    const CONFIG = {
      title: 'Enable Notifications',
      msg: 'Open Settings App to enable notifications'
    };
    confirmationPrompt(CONFIG);
    expect(Alert.alert).toHaveBeenCalledTimes(1);
    expect(Alert.alert).toHaveBeenCalledWith(
      CONFIG.title, 
      CONFIG.msg,
      [
        {text: 'No', onPress: expect.any(Function), style: 'cancel'},
        {text: 'Yes', onPress: expect.any(Function)},
      ],
    );
  });

  it('confirmationPrompt custom confirm and cancel', () => {
    const CONFIG = {
      title: 'Enable Notifications',
      msg: 'Open Settings App to enable notifications',
      cancel: 'Maybe Later',
      confirm: 'Lets goooo!'
    };
    confirmationPrompt(CONFIG);
    expect(Alert.alert).toHaveBeenCalledTimes(1);
    expect(Alert.alert).toHaveBeenCalledWith(
      CONFIG.title, 
      CONFIG.msg,
      [
        {text: CONFIG.cancel, onPress: expect.any(Function), style: 'cancel'},
        {text: CONFIG.confirm, onPress: expect.any(Function)},
      ],
    );
  });

});
