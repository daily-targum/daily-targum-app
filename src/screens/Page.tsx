import React from 'react';
import { ScrollView, View } from 'react-native';
import HTMLView from 'react-native-htmlview';
import { ActivityIndicator, Theme, Section } from '../components';
import { openLink, shareUrl, useConnection } from '../utils';
import Header from '../navigation/Header';
import Footer from '../navigation/BottomTabBar';
import { useDispatch } from 'react-redux';
import { pageActions, usePageSelector } from '../store/ducks/page';
import NotFoundScreen from './NotFound';
import { useRoute } from '@react-navigation/core';
import { PageRouteProp } from '../navigation/types';


export function Page() {
  const slug = useRoute<PageRouteProp>().params?.slug;
  const dispatch = useDispatch();
  const styles = Theme.useStyleCreator(styleCreator);
  const {dark} = Theme.useTheme();
  const page = usePageSelector(s => s.items[slug]);

  const contentInsets = {
    top: Header.useHeight({ safe: false }),
    bottom: Footer.useHeight({ safe: false })
  };

  useConnection(() => {
    dispatch(pageActions.loadPage({ slug }));
  }, []);

  if(page === undefined) return <ActivityIndicator.Screen/>;
  if(page === null) return <NotFoundScreen/>;

  return (
    <View
      style={styles.container}
      testID={`PageScreen-${slug}`}
    >
      <Header.ScrollSpacer/>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        contentInset={contentInsets}
        contentOffset={{
          y: -contentInsets.top,
          x: 0
        }}
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior='always'
        indicatorStyle={dark ? 'white' : 'black'}
      >
        <Section>
          <HTMLView
            onLinkPress={url => openLink({url})}
            onLinkLongPress={url => shareUrl(url)}
            stylesheet={styles}
            value={page.content?.replace(/>\s+/g, '>') || ''}
            addLineBreaks={false}
          />
        </Section>
      </ScrollView>
      <Footer.ScrollSpacer/>
    </View>
  );
}

const styleCreator = Theme.makeStyleCreator((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  contentContainer: {
    paddingBottom: 0
  },
  h1: {
    fontWeight: '800',
    fontSize: 32,
    lineHeight: 36,
    marginBottom: theme.spacing(2),
    padding: 0,
    margin: 0,
    color: theme.colors.text
  },
  h2: {
    fontWeight: '700',
    fontSize: 26,
    lineHeight: 36,
    marginBottom: theme.spacing(2),
    color: theme.colors.text
  },
  h3: {
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 36,
    marginBottom: theme.spacing(2),
    color: theme.colors.text
  },
  h4: {
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 36,
    marginBottom: theme.spacing(2),
    color: theme.colors.text
  },
  h5: {
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 36,
    marginBottom: theme.spacing(2),
    color: theme.colors.text
  },
  p: {
    fontSize: 17,
    lineHeight: 26,
    marginBottom: theme.spacing(2),
    color: theme.colors.text
  },
  a: {
    fontSize: 17,
    lineHeight: 26,
    marginBottom: theme.spacing(2),
    color: theme.colors.accent,
    textDecorationLine: 'underline'
  },
  b: {
    fontWeight: 'bold'
  }
}));

export default Page;