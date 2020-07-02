import React from 'react';
import { View } from 'react-native';
import { Theme, Text, Section } from '../components';
import { useScrollToTop } from '@react-navigation/native';
import Header from '../navigation/Header';
import Footer from '../navigation/BottomTabBar';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../utils';

export function NotFound() {
  const theme = Theme.useTheme();
  const styles = Theme.useStyleCreator(styleCreator);

  const contentInsets = {
    top: Header.useHeight({ safe: true }),
    bottom: Footer.useHeight({ safe: true })
  };

  const scrollIndicatorInsets = {
    top: Header.useHeight({ safe: false }),
    bottom: Footer.useHeight({ safe: false })
  };

  // tap tab to scroll to top
  const ref: any = React.useRef();
  useScrollToTop(React.useRef({
    scrollToTop: () => ref.current?.scrollToOffset({ offset: -contentInsets.top }),
  }));

  return(
    <View 
      style={styles.container}
      testID={`NotFound`}
    >
      <Header.ScrollSpacer/>
      <ScrollView
        style={styles.scrollView}
        ref={ref}
        contentInset={contentInsets}
        contentOffset={{
          y: -contentInsets.top,
          x: 0
        }}
        automaticallyAdjustContentInsets={false}
        scrollIndicatorInsets={scrollIndicatorInsets}
        contentInsetAdjustmentBehavior="never"
        indicatorStyle={theme.dark ? 'white' : 'black'}
      >
        <Section>
          <Text variant='h1'>404. Not found.</Text>
          <Text variant='p'>Sorry, but the page you were trying to view does not exist.</Text>
        </Section>
      </ScrollView>
      <Footer.ScrollSpacer/>
    </View>
  );
}

const styleCreator = Theme.makeStyleCreator((theme) => ({
  container: {
    ...styles.page(theme)
  },
  scrollView: {
    flex: 1
  },
}));

export default NotFound;