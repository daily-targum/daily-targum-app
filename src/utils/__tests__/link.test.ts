jest.mock('expo-linking', () => {
  let enabled = true;
  return ({
    enabled: true,
    setEnabled: (val: boolean) => enabled = val,
    canOpenURL: jest.fn(() => enabled),
    openURL: jest.fn()
  });
});
jest.mock('expo-web-browser', () => ({
  openBrowserAsync: jest.fn()
}));

import { openLink, openLinkFromArticle } from '../link';
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser';
import { ARTICLE } from '../../shared/src/client/actions/__mocks__/articles';
import * as logger from '../logger';
jest.spyOn(logger, 'logEvent');

describe('link', () => {

  beforeAll(() => {
    logger.initialize({
      enableInDevelopment: true
    });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('openLink with linking enabled', async () => {
    // @ts-ignore
    Linking.setEnabled(true);
    const URL = 'https://google.com';
    await openLink({url: URL});
    expect(Linking.canOpenURL).toHaveBeenCalledTimes(1);
    expect(Linking.openURL).toHaveBeenCalledTimes(1);
    expect(Linking.openURL).toHaveBeenCalledWith(URL);
    expect(logger.logEvent).toHaveBeenCalledTimes(0);
  });

  it('openLink with linking disabled', async () => {
    // @ts-ignore
    Linking.setEnabled(false);
    const URL = 'https://google.com';
    await openLink({url: URL});
    expect(Linking.canOpenURL).toHaveBeenCalledTimes(1);
    expect(Linking.openURL).toHaveBeenCalledTimes(0);
    expect(WebBrowser.openBrowserAsync).toHaveBeenCalledTimes(1);
    expect(WebBrowser.openBrowserAsync).toHaveBeenCalledWith(URL);
    expect(logger.logEvent).toHaveBeenCalledTimes(0);
  });

  it('openLinkFromArticle with linking enabled', async () => {
    // @ts-ignore
    Linking.setEnabled(true);
    const URL = 'https://google.com';
    await openLinkFromArticle({
      url: URL,
      article: ARTICLE
    });
    expect(Linking.canOpenURL).toHaveBeenCalledTimes(1);
    expect(Linking.openURL).toHaveBeenCalledTimes(1);
    expect(Linking.openURL).toHaveBeenCalledWith(URL);
    expect(logger.logEvent).toHaveBeenCalledTimes(1);
    expect(logger.logEvent).toHaveBeenCalledWith({
      event: 'OpenArticleLink',
      props: {
        url: URL,
        articleId: ARTICLE.id,
        title: ARTICLE.title,
        author: ARTICLE.authors.join(', ') 
      }
    });
  });

  it('openLinkFromArticle with linking disabled', async () => {
    // @ts-ignore
    Linking.setEnabled(false);
    const URL = 'https://google.com';
    await openLinkFromArticle({
      url: URL,
      article: ARTICLE
    });
    expect(Linking.canOpenURL).toHaveBeenCalledTimes(1);
    expect(Linking.openURL).toHaveBeenCalledTimes(0);
    expect(WebBrowser.openBrowserAsync).toHaveBeenCalledTimes(1);
    expect(WebBrowser.openBrowserAsync).toHaveBeenCalledWith(URL);
    expect(logger.logEvent).toHaveBeenCalledTimes(1);
    expect(logger.logEvent).toHaveBeenCalledWith({
      event: 'OpenArticleLink',
      props: {
        url: URL,
        articleId: ARTICLE.id,
        title: ARTICLE.title,
        author: ARTICLE.authors.join(', ')
      }
    });
  });

});
