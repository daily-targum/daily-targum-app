jest.useFakeTimers();

import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

// jest.mock('@expo/vector-icons/FontAwesome', () => 'Icon')

jest.mock('@expo/vector-icons/FontAwesome', () => jest.genMockFromModule('@expo/vector-icons/FontAwesome'));