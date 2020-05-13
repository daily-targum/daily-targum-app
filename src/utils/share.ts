
import * as logger from './logger';
import { Platform, Share } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Article } from '../types';

export function shareArticle({
  article,
  feedback = true
}: {
  article: Article,
  feedback?: boolean
}) {
  if(feedback && Platform.OS === 'ios') {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }
  Share.share({url: article.url});
  logger.logEvent({
    event: 'OpenedShareSheet',
    props: {
      id: article.id,
      title: article.title,
      author: article.author
    }
  });
}

export function shareUrl(url: string) {
  if(Platform.OS === 'ios') {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }
  Share.share({url});
  logger.logEvent({
    event: 'OpenedShareSheet',
    props: {
      url
    }
  });
}