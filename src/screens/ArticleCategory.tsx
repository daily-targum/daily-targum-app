import React, { useState, useRef } from 'react';
import { View, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { newsActions } from '../store/ducks/news';
import { Theme, ActivityIndicator, Card } from '../components';
import { GetArticle } from '../shared/src/client';
import { formatDateAbriviated } from '../shared/src/utils';
import { useRoute } from '@react-navigation/core';
import { useScrollToTop, useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import Header from '../navigation/Header';
import Footer from '../navigation/BottomTabBar';
import { FlatList } from 'react-native-gesture-handler';
import { logger } from '../utils';
import { ArticleCategoryPageProp } from '../navigation/types';

const idMap: any = {
  news: 'News',
  sports: 'Sports',
  opinions: 'Opinions',
  'inside-beat': 'inside-beat'
};

export function ArticleCategory() {
  const [ firstActivity, setFirstActivity ] = useState(false);
  const { colors, dark } = Theme.useTheme();
  const route = useRoute<ArticleCategoryPageProp>();
  const category = idMap[route.params.category] || route.params.category;
  const dispatch = useDispatch();
  const feed = useSelector((s: any) => s.news.feed);
  const styles = Theme.useStyleCreator(styleCreator);
  const navigation = useNavigation();

  const contentInsets = {
    top: Header.useHeight({ safe: true }),
    bottom: Footer.useHeight({ safe: true })
  };

  const scrollIndicatorInsets = {
    top: Header.useHeight({ safe: false }),
    bottom: Footer.useHeight({ safe: false })
  };

  // tap tab to scroll to top
  const ref: any = useRef();
  useScrollToTop(React.useRef({
    scrollToTop: () => ref.current?.scrollToOffset({ offset: -contentInsets.top }),
  }));

  if(!feed[category] || !feed[category].data || feed[category].data.length === 0) return (
    <ActivityIndicator.Screen/>
  );

  const { refreshing, nextToken } = feed[category];

  function onFirstActivity() {
    if(firstActivity) return;
    setFirstActivity(true);
    logger.logEvent({
      event: 'SelectedCategory',
      props: {
        name: route.name
      },
    });
  }

  const articles = feed[category].data;

  return(
    <View 
      style={styles.container}
      testID={`HomeScreen-${category}`}
    >
      <Header.ScrollSpacer/>
      <FlatList
        style={styles.list}
        ref={ref}
        data={articles}
        keyExtractor={(item: GetArticle, index) => item.title.toString() + index}
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              // prevent double refresh
              if(refreshing) return;
              // begin refresh
              dispatch(newsActions.loadCategory({ category }));
            }}
            refreshing={refreshing}
            tintColor={colors.spinner}
          />
        }
        renderItem={({item}) => (
          <Card.Compact
            title={item.title}
            image={item.media[0]+'?h=260&w=400&fit=crop&crop=faces,center'}
            date={formatDateAbriviated(item.publishDate)}
            onPress={() => {
              navigation.dispatch(
                StackActions.push('Article', { id: item.id })
              );
            }}
          />
        )}
        onScrollBeginDrag={onFirstActivity}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if(nextToken) dispatch(newsActions.loadCategory({ category, nextToken }));
        }}
        contentContainerStyle={styles.contentContainer}
        contentInset={contentInsets}
        contentOffset={{
          y: -contentInsets.top,
          x: 0
        }}
        automaticallyAdjustContentInsets={false}
        scrollIndicatorInsets={scrollIndicatorInsets}
        contentInsetAdjustmentBehavior="never"
        indicatorStyle={dark ? 'white' : 'black'}
        ListFooterComponent={(
          <View style={{padding: 30}}>
            <ActivityIndicator/>
          </View>
        )}
      />
      <Footer.ScrollSpacer/>
    </View>
  );
}

const styleCreator = Theme.makeStyleCreator((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    height: '100%'
  },
  contentContainer: {
    padding: theme.spacing(1)
  },
  list: {
    flex: 1
  },
  item: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(0.75),
    paddingBottom: theme.spacing(0.75),
    flexDirection: 'row'
  },
  itemImage: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    borderRadius: theme.roundness(),
  },
  itemContent: {
    flex: 1,
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(1.5)
  },
  itemByline: {
    color: '#888',
    fontSize: 14,
    marginBottom: 3,
  },
  itemTitle: {
    fontWeight: '600',
    fontSize: 18
  }
}));

export default ArticleCategory;