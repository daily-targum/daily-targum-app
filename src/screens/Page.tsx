import React from 'react';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Theme, Section, HTML } from '../components';
import { useConnection, styleHelpers } from '../utils';
import Header from '../navigation/Header';
import BottomTabBar from '../navigation/BottomTabBar';
import { useDispatch, useSelector } from '../store';
import { pageActions } from '../store/ducks/page';
import NotFoundScreen from './NotFound';
import { useRoute } from '@react-navigation/core';
import { PageRouteProp } from '../navigation/types';
import { hyphenatedToCamelCase } from '../shared/src/utils';


export function Page() {
  const slug = useRoute<PageRouteProp>().params?.slug;
  const dispatch = useDispatch();
  const styles = Theme.useStyleCreator(styleCreator);
  const theme = Theme.useTheme();
  const page = useSelector(s => s.page.items[slug]);

  const contentInsets = {
    top: Header.useHeight({ safe: false }),
    bottom: BottomTabBar.useHeight({ safe: false })
  };

  useConnection(() => {
    dispatch(pageActions.loadPage({ slug }));
  }, []);

  if(page === undefined) return <ActivityIndicator.Screen/>;
  if(page === null) return <NotFoundScreen/>;

  return (
    <View
      style={styles.container}
      testID={`pageScreen-${hyphenatedToCamelCase(slug)}`}
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
        indicatorStyle={theme.dark ? 'white' : 'black'}
      >
        <Section>
          <HTML
            html={page.content?.replace(/>\s+/g, '>') || ''}
          />
        </Section>
      </ScrollView>
      <BottomTabBar.ScrollSpacer/>
    </View>
  );
}

const styleCreator = Theme.makeStyleCreator((theme) => ({
  container: {
    ...styleHelpers.container(theme)
  },
  contentContainer: {
    ...styleHelpers.page(theme),
    paddingBottom: 0
  }
}));

export default Page;