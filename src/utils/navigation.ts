import { StackActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/core';

const internalDeepLinks = [
  {
    match: 'section/:category',
    dispatch: (params: any) => StackActions.push('ArticleCategory', params)
  },
  {
    match: 'page/:slug',
    dispatch: (params: any) => StackActions.push('Page', params)
  },
  {
    match: 'preview/:id',
    dispatch: (params: any) => StackActions.push('Preview', params)
  },
  {
    match: 'article/:year/:month/:slug',
    dispatch: (params: any) => StackActions.push('Article', params)
  },
  {
    match: '*',
    dispatch: () => StackActions.push('NotFound')
  },
];

function testMatch(match: string, val: string) {
  if(match === '*') {
    return true;
  }
  return (new RegExp(match.replace(/\/:[^\/]+/g, '\\/[^\/]+'), 'g')).test(val);
}

function parseParams(match: string, url: string) {
  const params: any = {};
  const urlArray = url.replace(/^\//, '').split('/');
  match.replace(/^\//, '').split('/').forEach((param, i) => {
    const isParam = /:.*/.test(param);
    if (isParam) {
      params[param.replace(/:/, '')] = urlArray[i];
    }
  });
  return params;
}

export function openDeepLink(link: string, navigation: NavigationProp<any>) {
  for(const item of internalDeepLinks) {
    if (testMatch(item.match, link)) {
      const params = parseParams(item.match, link);
      navigation.dispatch(
        item.dispatch(params)
      );
      return true;
    }
  }
  return false;
}