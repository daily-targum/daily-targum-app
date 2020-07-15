import React from 'react';
import { Theme, Card, ActivityIndicator, StatusBar } from '../components';
import Header from '../navigation/Header';
import BottomTabBar from '../navigation/BottomTabBar';
import { getAuthorPage, GetAuthorPage } from '../shared/src/client/actions';
import { useRoute } from '@react-navigation/core';
import { AuthorRouteProp } from '../navigation/types';
import { useScrollToTop, useNavigation, useIsFocused } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { View, FlatList } from 'react-native';
import { formatDateAbriviated } from '../shared/src/utils';
import { useNavigateBackEffect } from '../utils';


export function Author() {
  // const [ firstActivity, setFirstActivity ] = React.useState(false);
  const theme = Theme.useTheme();
  const [ page, setPage ] = React.useState<GetAuthorPage | null>(null);
  const [ sharedElementEnabled, setSharedElementEnabled ] = React.useState(true);
  const [ navigatingBack, setNavigatingBack ] = React.useState(false);
  const route = useRoute<AuthorRouteProp>();
  const styles = Theme.useStyleCreator(styleCreator);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    getAuthorPage({ author: route.params.author })
    .then(setPage);
  }, [route.params.author])

  useNavigateBackEffect(() => {
    setNavigatingBack(true);
    setSharedElementEnabled(false);
  }, []);

  const contentInsets = {
    top: Header.useHeight({ safe: true }),
    bottom: BottomTabBar.useHeight({ safe: true })
  };

  const scrollIndicatorInsets = {
    top: Header.useHeight({ safe: false }),
    bottom: BottomTabBar.useHeight({ safe: false })
  };

  // tap tab to scroll to top
  const ref: any = React.useRef();
  useScrollToTop(React.useRef({
    scrollToTop: () => ref.current?.scrollToOffset({ offset: -contentInsets.top }),
  }));

  if(!page) return (
    <ActivityIndicator.Screen/>
  );


  // function onFirstActivity() {
  //   if(firstActivity) return;
  //   setFirstActivity(true);
  //   logger.logEvent({
  //     event: 'SelectedCategory',
  //     props: {
  //       name: route.name
  //     },
  //   });
  // }

  const { articles, author } = page;

  return(
    <>
      {isFocused ? (
        <StatusBar 
          hidden={navigatingBack}
          showHideTransition='fade'
        />
      ) : null}
      <View 
        style={styles.container}
        testID={`AuthorScreen-${author[0]?.displayName.replace(/\s/g, '')}`}
      >
        <Header.ScrollSpacer/>
        <FlatList
          style={styles.list}
          ref={ref}
          data={articles}
          keyExtractor={item => item.id}
          // refreshControl={
          //   <RefreshControl
          //     onRefresh={() => {
          //       // prevent double refresh
          //       if(refreshing) return;
          //       // begin refresh
          //       dispatch(newsActions.loadCategory({ category }));
          //     }}
          //     refreshing={refreshing}
          //     tintColor={colors.spinner}
          //   />
          // }
          renderItem={({item}) => (
            <Card.Compact
              id={sharedElementEnabled ? item.id : 'disabled'}
              title={item.title}
              image={item.media[0]+'?h=500&w=500&fit=crop&crop=faces,center'}
              date={formatDateAbriviated(item.publishDate)}
              onPress={() => {
                navigation.dispatch(
                  StackActions.push('Article', { id: item.id, article: item })
                );
              }}
            />
          )}
          // onScrollBeginDrag={onFirstActivity}
          // onEndReachedThreshold={0.5}
          // onEndReached={() => {
          //   if(nextToken) dispatch(newsActions.loadCategory({ category, nextToken }));
          // }}
          contentContainerStyle={styles.contentContainer}
          contentInset={contentInsets}
          contentOffset={{
            y: -contentInsets.top,
            x: 0
          }}
          automaticallyAdjustContentInsets={false}
          scrollIndicatorInsets={scrollIndicatorInsets}
          contentInsetAdjustmentBehavior="never"
          indicatorStyle={theme.dark ? 'white' : 'black'}
          ListFooterComponent={(
            <View style={{padding: 30}}>
              <ActivityIndicator/>
            </View>
          )}
        />
        <BottomTabBar.ScrollSpacer/>
      </View>
    </>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
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

export default Author;