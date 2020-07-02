
import * as logger from './logger';
import { Platform, Share } from 'react-native';
import * as Haptics from 'expo-haptics';
import { GetArticle, Article } from '../shared/src/client';

export function shareArticle({
  article,
  feedback = true
}: {
  article: GetArticle | Article,
  feedback?: boolean
}) {
  if(feedback && Platform.OS === 'ios') {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }
  Share.share({url: 'https://dailytargum.com/'+article.slug});
  logger.logEvent({
    event: 'OpenedShareSheet',
    props: {
      id: article.id,
      title: article.title,
      author: article.authors.join(', ')
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