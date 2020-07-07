import * as logger from './logger';
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser';
import { GetArticle } from '../shared/src/client';
import { openDeepLink } from './navigation';
import { NavigationProp } from '@react-navigation/core';

export const prefixes = [
  Linking.makeUrl('/'),
  Linking.makeUrl(''),
  'https://dailytargum.now.sh'
];

/**
 * @param url 
 * @returns Promise opened successfully
 */
export async function openLink({
  url,
  navigation
}: {
  url: string
  navigation?: NavigationProp<any>
}) {
  let isDeepLink = false;
  let prefix = '';

  prefixes.forEach(str => {
    if (url.indexOf(str) === 0) {
      prefix = str;
      isDeepLink = true;
    };
  });

  if (navigation && isDeepLink && openDeepLink(url.replace(prefix, ''), navigation)) {
    return true;
  }

  if(await Linking.canOpenURL(url)) {
    try {
      await Linking.openURL(url);
      return true;
    } catch(err) {
      if(err.message)
      // Linking.canOpenURL() can lie
      // e.g if the user deletes the mail app
      // which will throw "Unable to open URL: name@example.com"
      if(!/^Unable to open URL:/.test(err.message)) {
        logger.logError(err);
      }
      // don't fall back to WebBrowser
      // to prevent another error
      return false;
    }
  } 
  
  try {
    await WebBrowser.openBrowserAsync(url);
    return true;
  } catch(err) {
    logger.logError(err);
    return false;
  } 
}

export async function openLinkFromArticle({
  url,
  article
}: {
  url: string,
  article: GetArticle
}) {
  // const openedSuccessfully = await openLink({url});
  // if(openedSuccessfully) {
  //   logger.logEvent({
  //     event: 'OpenArticleLink',
  //     props: {
  //       url: url,
  //       articleId: article.id,
  //       title: article.title,
  //       author: article.authors.join(', ')
  //     }
  //   });
  // }
}