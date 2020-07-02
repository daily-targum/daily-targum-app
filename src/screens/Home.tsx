import React from 'react';
import { Theme, Button, ArticleCard, ActivityIndicator, Text } from '../components';
import { View, RefreshControl, Platform, TouchableWithoutFeedback, LayoutChangeEvent } from 'react-native';
import { GetArticle } from '../shared/src/client';
import Header from '../navigation/Header';
import Footer from '../navigation/BottomTabBar';
import Drawer from '../navigation/Drawer';
import { useDispatch } from 'react-redux';
import { useDate } from '../utils';
import Animated from 'react-native-reanimated';
import { newsActions, useNewsSelector } from '../store/ducks/news';
import { useScrollToTop, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const HEADER_HEIGHT = 96;

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
  },
  // {
  //   id: 'videos',
  //   title: 'Videos',
  //   type: 'video'
  // }
];

function ArticleSection({
  title,
  items,
  category,
  cols
}: {
  title: string,
  items?: GetArticle[] | null,
  category: string,
  cols: number
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  const {dark, colors, spacing} = Theme.useTheme();
  const navigation = useNavigation();
  if(!items) return null;
  return (
    <LinearGradient 
      colors={[
        colors.background,
        (dark ? '#1f1f21' : '#eee')
      ]}
      start={{x: 0.5, y: 0}}
      end={{x: 1, y: 1}}
    >
      <TouchableWithoutFeedback onPress={() => navigation.navigate('ArticleCategory', {category})}>
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Button.Text 
            style={styles.button}
            onPress={() => navigation.navigate('ArticleCategory', {category})}
          >More</Button.Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.sectionBody}>
        {items.slice(0,4*cols).map((item, i) => i < cols ? (
          <ArticleCard.Large 
            key={item.id+'large'}
            article={item}
            width={100/cols+'%'}
            style={{
              paddingRight: (i % cols === cols - 1) ? 0 : spacing(0.75),
              paddingLeft: (i % cols === 0) ? 0 : spacing(0.75),
            }}
          />
        ) : (
          <ArticleCard.Small 
            key={item.id+'small'}
            article={item}
            width={100/cols+'%'}
            style={{
              paddingRight: (i % cols === cols - 1) ? 0 : spacing(0.75),
              paddingLeft: (i % cols === 0) ? 0 : spacing(0.75),
            }}
          />
        ))}
      </View>
    </LinearGradient>
  );
}

export function Home() {
  const styles = Theme.useStyleCreator(styleCreator);
  const {dark, statusBarHeight, colors, insets} = Theme.useTheme();
  const contentInsets = {
    top: HEADER_HEIGHT - (insets.top - statusBarHeight),
    bottom: Footer.useHeight({safe: false})
  };
  const scrollY = React.useRef(new Animated.Value(-contentInsets.top)).current;
  const dispatch = useDispatch();
  const refreshing = useNewsSelector(s => s.refreshingAll);
  const loading = useNewsSelector(s => s.loading);
  const feed = useNewsSelector(s => s.feed);
  const ref = React.useRef<any>();
  const date = useDate('minute');
  useScrollToTop(React.useRef({
    scrollToTop: () => ref.current?.scrollToOffset({ offset: -contentInsets.top }),
  }));
  const [cols, setCols] = React.useState(1);
  function getColumns(event: LayoutChangeEvent) {
    const width = event.nativeEvent.layout.width;
    setCols(Math.min(Math.ceil(width / 475), 3));
  }
  return (
    <View 
      style={styles.container} 
      testID='HomeScreen'
      onLayout={getColumns}
    >
      <Animated.ScrollView
        ref={ref}
        contentInset={contentInsets}
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior='always'
        indicatorStyle={dark ? 'white' : 'black'}
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
            tintColor={colors.spinner}
          />
        }
        style={{flex: 1, maxHeight: '100%'}}
      >
        {Platform.OS !== 'ios' ? (
          <View style={styles.pageHeader} testID='PageHeader'>
            <View style={styles.row}>
              <Text style={styles.title}>Daily Targum</Text>
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
            cols={cols}
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
                inputRange: [-contentInsets.top - insets.top, 0],
                outputRange: [0, -contentInsets.top - insets.top],
                extrapolate: Animated.Extrapolate.CLAMP
              })
            }]
          }]}
          testID='PageHeader'
        >
          <View style={styles.row}>
            <Text style={styles.title}>Daily Targum</Text>
            <Drawer.Button/>
          </View>
          <Text style={styles.subtitle}>{date.format('dddd, MMMM D')}</Text>
        </Animated.View>
      ) : null}
      <Header.Animated
        title='Daily Targum'
        scrollY={scrollY}
        offset={Platform.select({
          ios: -(contentInsets.top-statusBarHeight*0.5) - insets.top,
          default: 0
        })}
      />
      <Footer.ScrollSpacer/>

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
    fontSize: 32, 
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
  sectionTitleRow: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  sectionBody: {
    padding: theme.spacing(2),
    paddingTop: 0,
    paddingBottom: theme.spacing(1),
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800'
  },
  cardSpacer: {
    width: theme.spacing(1)
  },
  button: {
    height: 28,
    borderRadius: 14
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  }
}));

export default Home;