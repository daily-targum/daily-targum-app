import Constants from 'expo-constants';

export function isBeta() {
  return Constants.manifest.releaseChannel === 'default';
}