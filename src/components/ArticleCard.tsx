import React from 'react';
import Theme from '../components/Theme';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { GetArticle } from '../shared/src/client';
import { useNavigation } from '@react-navigation/core';
import { formatDateAbriviated } from '../shared/src/utils';
import { shareArticle } from '../utils';
import { LinearGradient } from 'expo-linear-gradient';

function Large({
  article,
  width,
  style
}: {
  article: GetArticle,
  width: number | string,
  style?: any
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  const navigation = useNavigation();
  function handlePress() {
    navigation.navigate('Article', {
      // id: '6jd2Gmkw7kuC3GWnjiuYY7',
      id: article.id
    });
  }
  return (
    <TouchableOpacity 
      onPress={handlePress}
      onLongPress={() => shareArticle({article})}
      activeOpacity={0.7}
      style={[{width}, style]}
    >
      <View style={styles.cardLarge}>
        <Image 
          source={{uri: article.media+'?h=260&w=400&fit=crop&crop=faces,center'}}
          style={styles.cardLargeImage}
          resizeMethod="resize"
        />
        <LinearGradient
          colors={['transparent', '#222']}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%'
          }}
        />
        <View style={styles.cardLargeContent}>
          <Text numberOfLines={1} style={styles.cardSubtitleLarge}>{formatDateAbriviated(article.publishDate)}</Text>
          <Text numberOfLines={2} style={styles.cardTitleLarge}>{article.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function Medium({
  article,
  style
}: {
  article: GetArticle,
  style?: any
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  const navigation = useNavigation();
  function handlePress() {
    navigation.navigate('Article', {
      // id: '6jd2Gmkw7kuC3GWnjiuYY7',
      id: article.id
    });
  }
  return (
    <TouchableOpacity 
      onPress={handlePress}
      onLongPress={() => shareArticle({article})}
      activeOpacity={0.7}
      style={style}
    >
      <View style={styles.cardMedium}>
        {article.media ? (
          <Image 
            source={{uri: article.media+'?h=260&w=400&fit=crop&crop=faces,center'}}
            style={styles.cardMediumImage}
            resizeMethod="resize"
          />
        ) : null}
        <View style={styles.cardMediumContent}>
          <Text numberOfLines={1} style={styles.cardSubtitle}>{formatDateAbriviated(article.publishDate)}</Text>
          <Text numberOfLines={3} style={styles.cardTitle}>{article.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function Small({
  article,
  width,
  style
}: {
  article: GetArticle,
  width: number | string,
  style?: any
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  const navigation = useNavigation();
  function handlePress() {
    navigation.navigate('Article', {
      // id: '6jd2Gmkw7kuC3GWnjiuYY7',
      id: article.id,
      article
    });
  }
  return (
    <TouchableOpacity 
      onPress={handlePress}
      onLongPress={() => shareArticle({article})}
      activeOpacity={0.7}
      style={[{width}, style]}
    >
      <View style={styles.cardSmall}>
        {article.media ? (
          <Image 
            source={{uri: article.media+'?h=200&w=300&fit=crop&crop=faces,center'}}
            style={styles.cardSmallImage}
            resizeMethod="resize"
          />
        ) : null}
        <View style={styles.cardSmallContent}>
          <Text numberOfLines={1} style={styles.cardSubtitle}>{formatDateAbriviated(article.publishDate)}</Text>
          <Text numberOfLines={3} style={styles.cardTitle}>{article.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  // Large Card
  cardLarge: {
    flexDirection: 'column',
    borderRadius: theme.roundness(1),
    overflow: 'hidden',
    marginBottom: theme.spacing(1.5)
  },
  cardLargeImage: {
    width: '100%',
    aspectRatio: 3/2
  },
  cardLargeContent: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    padding: theme.spacing(2)
  },
  cardTitleLarge: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff'
  },
  cardSubtitleLarge: {
    fontSize: 14,
    color: theme.colors.textMuted,
    paddingBottom: theme.spacing(1)
  },
  // Medium Card
  cardMedium: {
    flexDirection: 'column',
    width: 190
  },
  cardMediumImage: {
    width: '100%',
    borderRadius: theme.roundness(1),
    aspectRatio: 3/2
  },
  cardMediumContent: {
    flex: 1,
    padding: theme.spacing(1.5)
  },
  // Small Card
  cardSmall: {
    flexDirection: 'row',
    marginBottom: theme.spacing(1.5),
    overflow: 'hidden'
  },
  cardSmallImage: {
    flex: 1,
    width: '40%',
    maxWidth: '40%',
    borderRadius: theme.roundness(1),
    aspectRatio: 3/2
  },
  cardSmallContent: {
    flex: 1,
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1.5),
    paddingRight: 0,
    paddingBottom: 0
  },
  // All Cards
  cardTitle: {
    fontSize: 14,
    fontWeight: '700'
  },
  cardSubtitle: {
    fontSize: 14,
    color: theme.colors.textMuted,
    paddingBottom: theme.spacing(1)
  }
}));

export default {
  Large,
  Medium,
  Small
};