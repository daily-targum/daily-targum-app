import React from 'react';
export { default as ArticleScreen } from './Article';
export const SettingsScreen = React.lazy(() => import('./SettingsScreen'));
export const CalendarScreen = React.lazy(() => import('./CalendarScreen'));
export const ContentfulScreen = React.lazy(() => import('./ContentfulScreen'));
export const HomeScreen = React.lazy(() => import('./HomeScreen'));
export const DeveloperScreen = React.lazy(() => import('./DeveloperScreen'));
export const ArticleCategory = React.lazy(() => import('./ArticleCategory'));