const mockAmplitude = jest.fn();
jest.mock('expo-analytics-amplitude', () => ({
  logEventWithProperties: (...params: any[]) => mockAmplitude(...params),
  logEvent: (...params: any[]) => mockAmplitude(...params)
}));

const mockSentry = jest.fn();
jest.mock('sentry-expo', () => ({
  captureException: (...params: any[]) => mockSentry(...params)
}));

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Medium: 'Medium'
  }
}));

import { shareArticle, shareUrl } from '../share';
import * as logger from '../logger';
import { Share } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Article } from '../../types';
jest.spyOn(Share, 'share');
jest.spyOn(logger, 'logEvent');

const ARTICLE: Article = {
  id: '982-af8ojpjoiadfp83498',
  title: 'Super Catchy Title',
  media: '',
  author: 'Jon Doe',
  date: '01-18-2020',
  content: '',
  url: 'https://google.com'
};

describe('share', () => {

  beforeAll(() => {
    logger.initialize({
      enableInDevelopment: true
    });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shareUrl', async () => {
    const URL = 'https://google.com';
    shareUrl(URL);
    expect(Haptics.impactAsync).toHaveBeenCalledTimes(1);
    expect(Share.share).toHaveBeenCalledTimes(1);
    expect(Share.share).toHaveBeenCalledWith({
      url: URL
    });
    expect(logger.logEvent).toHaveBeenCalledTimes(1);
    expect(logger.logEvent).toHaveBeenCalledWith({
      event: 'OpenedShareSheet',
      props: {
        url: URL
      }
    });
  });

  it('shareArticle', async () => {
    shareArticle({article: ARTICLE});
    expect(Haptics.impactAsync).toHaveBeenCalledTimes(1);
    expect(Share.share).toHaveBeenCalledTimes(1);
    expect(Share.share).toHaveBeenCalledWith({
      url: ARTICLE.url
    });
    expect(logger.logEvent).toHaveBeenCalledTimes(1);
    expect(logger.logEvent).toHaveBeenCalledWith({
      event: 'OpenedShareSheet',
      props: {
        id: ARTICLE.id,
        title: ARTICLE.title,
        author: ARTICLE.author
      }
    });
  });

});
