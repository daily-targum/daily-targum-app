import React, { useState, useEffect } from 'react';
import { View, StatusBar, NativeScrollEvent, Image, Platform } from 'react-native';
import HTMLView from 'react-native-htmlview';
import { Text } from 'react-native-paper';
import { logEvent } from '../utils/logger';
import { useNavigation } from '@react-navigation/core';
import { formatDate, shareArticle, shareUrl, openLinkFromArticle, useFreshContent } from '../utils';
import { Surface, Theme, Icon, FocalPointImage, ActivityIndicator, Section, ScrollViewWithHeader, Button } from '../components';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Article as ArticleType } from '../types';
import { actions } from '../shared/src/client';
import { drafts } from '../clients/contentful/client';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import NotFoundScreen from './NotFoundScreen';
import { FontAwesome } from '@expo/vector-icons';


const IMAGE_HEIGHT = 320;


function Article({
  article,
  image
}: {
  article: ArticleType | null | undefined,
  image: React.ReactNode
}) {

  const {insets, dark} = Theme.useTheme();
  const [finished, setFinished] = useState(false);
  const navigation = useNavigation();
  const styles = Theme.useStyleCreator(styleCreator);

  function goBack() {
    if(navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('App');
    }
  }

  function onShare() {
    if(article) {
      shareArticle({article, feedback: false});
    }
  }

  function checkFinish({nativeEvent}: {nativeEvent: NativeScrollEvent}) {
    if(!article || finished) return;
    function isCloseToBottom() {
      const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
      return layoutMeasurement.height + contentOffset.y >=
             (contentSize.height - insets.bottom) * 0.8;
    }
    if(isCloseToBottom()) {
      setFinished(true);
      logEvent({
        event: 'FinishedArticle',
        props: {
          id: article.id,
          title: article.title,
          author: article.author
        }
      });
    }
  }

  return (
    <View 
      style={styles.container}
      onLayout={() => {}}
    >
      <StatusBar animated={true} hidden={Platform.OS === 'ios'}/>
      {article ? (
        <ScrollViewWithHeader
          indicatorStyle={dark ? 'white' : 'black'}
          Header={image}
          headerHeight={IMAGE_HEIGHT}
          onScrollEndDrag={checkFinish}
          style={{height: '100%'}}
        > 
          <Section style={styles.article}>
            <Text style={styles.title}>{article.title}</Text>
            <View style={styles.spacer}/>
            <Text style={styles.author}>{article.author}</Text>
            <Text style={styles.date}>{formatDate(article.date)}</Text>
            <View style={styles.spacer}/>
            <HTMLView
              addLineBreaks={false}
              onLinkPress={(url) => openLinkFromArticle({url, article})}
              onLinkLongPress={shareUrl}
              stylesheet={styles}
              value={article.content}
            />
          </Section>
          <Section innerStyle={styles.shareSection}>
            <Button onPress={onShare}> 
              {Platform.OS === 'ios' ? (
                <Icon
                  size={38}
                  color={styles.buttonText.color}
                  name='share'
                />
              ) : (
                <FontAwesome
                  size={26}
                  color={styles.buttonText.color}
                  name='share-alt'
                  style={{
                    padding: 8,
                    paddingLeft: 0,
                    paddingRight: 12
                  }}
                />
              )}
              <Text style={styles.buttonText}>Share Article</Text>
            </Button>
          </Section>
        </ScrollViewWithHeader>
      ): <ActivityIndicator.Screen/>}

      {article === undefined ? (
        <ActivityIndicator.Screen/>
      ) : null}

      {article === null ? (
        <NotFoundScreen/>
      ) : null}

      <Section style={{
        position: 'absolute',
        width: '100%'
      }}>
        <Surface style={styles.closeIcon}>
          <Icon
            size={38}
            onPress={goBack}
            color={styles.closeButtonText.color}
            name={Platform.OS === 'android' ? 'back-android' : 'close'}
          />
        </Surface>
      </Section>
    </View>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  container: {
    backgroundColor: theme.colors.background,
    height: '100%'
  },
  share: {
    color: '#fff',
  },
  hide: {
    display: 'none'
  },
  closeIcon: {
    position: 'absolute',
    top: 16 + (Platform.OS !== 'ios' ? theme.insets.top - 5 : 5),
    left: 16 + (Platform.OS !== 'ios' ? 0 : 5),
    height: 32,
    width: 32,
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  article: {
    flex: 1,
    paddingBottom: 0,
    height: '100%'
  },
  image: {
    height: '100%'
  },
  imageSpacer: {
    height: 45 + (Platform.OS !== 'ios' ? theme.insets.top : 10),
  },
  previewBackdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  preview: {
    borderRadius: theme.roundness(),
    overflow: 'hidden'
  },
  previewTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingLeft: 18
  },
  previewText: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 28
  },
  // Text Styles
  title: {
    fontWeight: '800',
    fontSize: 32,
    lineHeight: 36
  },
  author: {
    color: theme.colors.accent,
    fontSize: 18,
    marginBottom: theme.spacing(0.6)
  },
  date: {
    color: theme.colors.textMuted,
    fontSize: 14
  },
  p: {
    color: theme.colors.text,
    fontSize: 18,
    lineHeight: 26,
    marginBottom: theme.spacing(2)
  },
  a: {
    fontSize: 17,
    lineHeight: 26,
    marginBottom: theme.spacing(2),
    color: theme.colors.accent,
    textDecorationLine: 'underline'
  },
  shareSection: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: theme.spacing(4),
  }, 
  buttonText: {
    fontSize: 18,
    color: theme.colors.accent
  },
  closeButtonText: {
    color: theme.dark ? 'rgba(0,0,0,0.9)' : '#fff'
  },
  spacer: {
    height: theme.spacing(2)
  }
}));

function GraphQL({
  route
}: {
  route: any
}) {
  const {id} = route.params;
  const [article, setArticle] = useState<ArticleType | null | undefined>();
  const styles = Theme.useStyleCreator(styleCreator);

  useFreshContent(() => {
    let isCancled = false;
    actions.getArticle({id})
    .then(res => {
      // res will be null if
      // the page isn't found
      if(!isCancled) {
        setArticle(res);
      }
    });
    return () => {
      isCancled = true;
    }
  }, [id]);

  return (
    <Article
      article={article}
      image={(article && article.media) ? (
        <Image
          source={{uri: article.media}}
          style={styles.image}
          resizeMethod="resize"
        />
      ): null}
    />
  )
}

function Contentful({
  route
}: {
  route: any
}) {
  const {id} = route.params;
  const [article, setArticle] = useState<ArticleType | null | undefined>(undefined);
  const [image, setImage] = useState<any>();
  const {insets} = Theme.useTheme();
  const styles = Theme.useStyleCreator(styleCreator, 1);
  const {colors} = Theme.useTheme();
  const [refreshing, setRefreshing] = useState(false);

  function refreshContent() {
    if(refreshing) return;
    setRefreshing(true);
    drafts.getEntry(id)
    .then((res: any) => {
      const {fields} = res;
      setArticle({
        id,
        title: fields.title,
        date: fields.publishDate,
        media: '',
        // TODO: pass authors as array once we switch to contentful
        author: fields.authors.map((a: any, i: number) => (
          ((fields.authors.length > 2 && i < fields.authors.length - 1) ? ', ' : '') +
          ((fields.authors.length > 1 && i === fields.authors.length - 1) ? ' and ' : '') +
          a.fields.displayName
        )),
        content: documentToHtmlString(fields.body),
        url: ''
      });
      setImage(fields.image);
    })
    .catch(() => setArticle(null))
    .finally(() => setRefreshing(false));
  }

  useEffect(() => {
    refreshContent();
  }, [id]);

  return (
    <View style={{flex: 1}}>
      <Article
        article={article}
        image={(!image || !image.fields.image) ? null : (
          <FocalPointImage
            src={`https:${image.fields.image.fields.file.url}`}
            focalPoint={image.fields.focalPoint.focalPoint}
            size={image.fields.image.fields.file.details.image}
            style={styles.image}
            offset={{
              top: insets.top
            }}
          />
        )}
      />
      {article ? (
        <View style={styles.previewBackdrop} pointerEvents='box-none'>
          <Surface style={styles.preview}>
            <TouchableHighlight
              underlayColor={colors.touchableHighlight}
              onPress={refreshContent}
            >
              <View style={styles.previewTouchable}>
                <Text style={styles.previewText}>Preview</Text>
                <Icon size={42} name='refresh'/>
              </View>
            </TouchableHighlight>
          </Surface>
        </View>
      ) : null}
    </View>
  )
}

export default {
  GraphQL,
  Contentful
};