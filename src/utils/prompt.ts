import { Alert } from 'react-native';

export const confirmationPrompt = async ({
  title, 
  msg, 
  confirm, 
  cancel 
}: {
  title: string, 
  msg: string, 
  confirm?: string, 
  cancel?: string
}) => (
  new Promise((resolve) => {
    Alert.alert(
      title, msg,
      [{
        text: cancel || 'No',
        style: 'cancel',
        onPress: () => resolve(false)
      },
      {
        text: confirm || 'Yes',
        onPress: () => resolve(true)
      }]
    );
  })
);