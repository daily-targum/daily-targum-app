import React from 'react';
import { Theme, Button, ActivityIndicator, Text, Divider, Card, CardRow, Section } from '../components';
import { View, RefreshControl, Platform, TouchableWithoutFeedback } from 'react-native';
import { Article } from '../shared/src/client';
import { formatDateAbriviated } from '../shared/src/utils';
import Header from '../navigation/Header';
import BottomTabBar from '../navigation/BottomTabBar';
import Drawer from '../navigation/Drawer';
import { useDispatch } from 'react-redux';
import { useDate } from '../utils';
import Animated from 'react-native-reanimated';
import { newsActions } from '../store/ducks/news';
import { useSelector } from '../store';
import { useScrollToTop, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';

const HEADER_HEIGHT = 96;

function chopArray<I>(arr: I[]) {
  return [[arr[0]], [arr[1], arr[2]], [arr[3], arr[4]], [arr[5], arr[6]]];
}

const sections = [
  {
    id: 'News',
    title: 'News',
    type: 'article'
  },
  {
    id: 'Sports',
    title: 'Sports',
    type: 'article'
  },
  {
    id: 'Opinions',
    title: 'Opinions',
    type: 'article'
  },
  {
    id: 'inside-beat',
    title: 'Inside Beat', 
    type: 'article'
  }
];

function ArticleSection({
  title,
  items,
  category
}: {
  title: string,
  items?: Article[] | null,
  category: string
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  const theme = Theme.useTheme();
  const navigation = useNavigation();

  if(!items || items.length === 0) return null;

  return (
    <LinearGradient 
      colors={[
        theme.colors.background,
        (theme.dark ? '#1f1f21' : '#ddd')
      ]}
      start={{x: 0.5, y: 0}}
      end={{x: 1, y: 1}}
    >
      <Section style={styles.section}>

        <TouchableWithoutFeedback onPress={() => navigation.navigate('ArticleCategory', {category})}>
          <Text variant='h4'>{title}</Text>
        </TouchableWithoutFeedback>

        <CardRow items={chopArray(items)}>
          {(item, i) => {
            if(!item) return null;
            return i === 0 ? (
              <Card.ImageResponsiveAspectRatio
                title={item[0].title}
                image={item[0].media[0]+'?h=500&w=500&fit=crop&crop=faces,center'}
                date={formatDateAbriviated(item[0].publishDate)}
                aspectRatioMobile={[3, 2]}
                onPress={() => {
                  navigation.dispatch(
                    StackActions.push('Article', { id: item[0].id, article: item[0] })
                  );
                }}
                id={item[0].id}
              />
            ) : (
              <React.Fragment key={item[0].id}>
                <Card.Compact
                  id={item[0].id}
                  title={item[0].title}
                  image={item[0].media[0]+'?h=500&w=500&fit=crop&crop=faces,center'}
                  date={formatDateAbriviated(item[0].publishDate)}
                  onPress={() => {
                    navigation.dispatch(
                      StackActions.push('Article', { id: item[0].id, article: item[0] })
                    );
                  }}
                />
                <Card.Compact
                  id={item[1].id}
                  title={item[1].title}
                  image={item[1].media[0]+'?h=500&w=500&fit=crop&crop=faces,center'}
                  date={formatDateAbriviated(item[1].publishDate)}
                  onPress={() => {
                    navigation.dispatch(
                      StackActions.push('Article', { id: item[1].id, article: item[1] })
                    );
                  }}
                />
              </React.Fragment>
            );
          }}
        </CardRow>

        <Divider style={styles.divider}/>
        <Button.Link 
          style={styles.moreButton}
          onPress={() => navigation.navigate('ArticleCategory', {category})}
        >
          More in {category} <Feather name="arrow-right" size={16} />
        </Button.Link>
      </Section>
    </LinearGradient>
  );
}

export function Home() {
  const styles = Theme.useStyleCreator(styleCreator);
  const theme = Theme.useTheme();
  const contentInsets = {
    top: HEADER_HEIGHT - (theme.insets.top - theme.statusBarHeight),
    bottom: BottomTabBar.useHeight({safe: false})
  };
  const scrollY = React.useRef(new Animated.Value(-contentInsets.top)).current;
  const dispatch = useDispatch();
  const refreshing = useSelector(s => s.news.refreshingAll);
  const loading = useSelector(s => s.news.loading);
  const feed = useSelector(s => s.news.feed);
  const ref = React.useRef<any>(null);
  const date = useDate('minute');
  useScrollToTop(React.useRef({
    scrollToTop: () => ref.current?.scrollToOffset({ offset: -contentInsets.top }),
  }));

  return (
    <View 
      style={styles.container} 
      testID='HomeScreen'
    >
      <Animated.ScrollView
        ref={ref}
        contentInset={contentInsets}
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior='always'
        indicatorStyle={theme.dark ? 'white' : 'black'}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }]
        )}
        scrollEventThrottle={12}
        contentOffset={{
          y: -contentInsets.top,
          x: 0
        }}
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              // prevent double refresh
              if(refreshing) return;
              // begin refresh
              dispatch(newsActions.refreshAll({}));
            }}
            refreshing={refreshing}
            tintColor={theme.colors.spinner}
          />
        }
        style={{flex: 1, maxHeight: '100%'}}
      >
        {Platform.OS !== 'ios' ? (
          <View style={styles.pageHeader} testID='PageHeader'>
            <View style={styles.row}>
              <Text variant='h1' style={styles.title}>Daily Targum</Text>
              <Drawer.Button/>
            </View>
            <Text style={styles.subtitle}>{date.format('dddd, MMMM D')}</Text>
          </View>
        ) : null}
        {sections.map(section => (
          <ArticleSection
            key={section.id}
            title={section.title}
            items={feed[section.id].data.slice(0,20)}
            category={section.id}
          />
        ))}
      </Animated.ScrollView>
      {Platform.OS === 'ios' ? (
        <Animated.View
          style={[styles.pageHeader, {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            transform: [{
              translateY: scrollY.interpolate({
                inputRange: [-contentInsets.top - theme.insets.top, 0],
                outputRange: [0, -contentInsets.top - theme.insets.top],
                extrapolate: Animated.Extrapolate.CLAMP
              })
            }]
          }]}
          testID='PageHeader'
        >
          <View style={styles.row}>
            <Text variant='h1' style={styles.title}>Daily Targum</Text>
            <Drawer.Button/>
          </View>
          <Text style={styles.subtitle}>{date.format('dddd, MMMM D')}</Text>
        </Animated.View>
      ) : null}
      <Header.Animated
        title='Daily Targum'
        scrollY={scrollY}
        offset={Platform.select({
          ios: -(contentInsets.top - theme.statusBarHeight * 0.5) - theme.insets.top,
          default: 0
        })}
      />
      <BottomTabBar.ScrollSpacer/>

      {loading ? <ActivityIndicator.Screen/> : null}
    </View>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    maxHeight: '100%',
    height: '100%'
  },
  pageHeader: {
    minHeight: HEADER_HEIGHT + theme.statusBarHeight,
    padding: theme.spacing(2),
    paddingTop: theme.spacing(2) + theme.statusBarHeight,
    paddingRight: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.divider,
    backgroundColor: theme.colors.primary
  },
  title: {
    fontWeight: '800',
    color: '#fff'
  },
  subtitle: {
    textTransform: 'uppercase',
    color: theme.colors.accent,
    fontWeight: '500',
    fontSize: 15
  },
  // Medium Card
  section: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
  moreButton: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    justifyContent: 'flex-end'
  },
  cardSpacer: {
    width: theme.spacing(1)
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  }
}));

export default Home;