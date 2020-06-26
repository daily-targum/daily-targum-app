import { RouteProp } from '@react-navigation/core';

export type RootStackParamList = {
  Page: { slug: string }
};

export type PageRouteProp = RouteProp<RootStackParamList, 'Page'>;