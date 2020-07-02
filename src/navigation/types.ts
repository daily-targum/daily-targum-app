import { RouteProp } from '@react-navigation/core';

export type RootStackParamList = {
  Page: { slug: string }
  ArticleCategory: { category: string }
  Author: { author: string }
};

export type PageRouteProp = RouteProp<RootStackParamList, 'Page'>;
export type ArticleCategoryPageProp = RouteProp<RootStackParamList, 'ArticleCategory'>;
export type AuthorRouteProp = RouteProp<RootStackParamList, 'Author'>;