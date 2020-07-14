import React from 'react';
import Theme from './Theme';
import Text from './Text';
import Grid from './Grid/native';
import { AspectRatioView } from './AspectRatioView';
import { styleHelpers } from '../utils';
import { View, ViewStyle, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SharedElement } from 'react-navigation-shared-element';


function CardCompact({
  title,
  subtitle,
  tag,
  image,
  aspectRatio,
  date,
  style,
  onPress,
  id
}: {
  title?: string
  subtitle?: string
  tag?: string
  image: string
  aspectRatio?: [number, number]
  date?: string,
  style?: ViewStyle
  onPress?: () => any,
  id: string
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <TouchableOpacity 
      style={styles.cardLink}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.compactCard, style]}>
        <SharedElement 
          id={`card.${id}.image`} 
          style={[
            styles.compactCardImageWrap,
            {
              aspectRatio: aspectRatio ? (aspectRatio[0] / aspectRatio[1]) : undefined
            }
          ]}
        >
          <Image
            style={styles.image}
            source={{uri: image}}
            resizeMethod="resize"
            resizeMode='cover'
          />
        </SharedElement>
        <View style={styles.cardBody}>
          {tag ? <Text style={styles.tag}>{tag}</Text> : null}
          {title ? (
            <SharedElement id={`card.${id}.title`}>
              <Text 
                variant='h5' 
                numberOfLines={3} 
                lockNumberOfLines
                noPadding
              >
                {title}
              </Text>
            </SharedElement>
          ) : null}
          {date ? (
            <SharedElement id={`card.${id}.date`}>
              <Text variant='h6' style={styles.subtitle} noPadding>{date}</Text>
            </SharedElement>
          ) : null}
          {subtitle ? <Text variant='h6' numberOfLines={3}>{subtitle}</Text> : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

type CardStackedProps = {
  title?: string
  subtitle?: string
  tag?: string
  image: string
  aspectRatio?: [number, number]
  date?: string
  onPress?: () => any
  id: string
}

function CardStacked({
  title,
  subtitle,
  tag,
  image,
  aspectRatio,
  date
}: CardStackedProps) {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <View style={styles.cardLink}>
      <View style={styles.stackedCard}>
        <ImageBackground
          style={styles.backgroundImgae}
          source={{uri: image}}
        >
          {aspectRatio ? (
          <AspectRatioView 
            aspectRatio={aspectRatio}
            style={{width: '100%'}}
          /> 
        ) : <View style={{flex: 1}}/>}
        </ImageBackground>
        <View style={styles.cardBody}>
          {date ? <Text variant='p' style={styles.date}>{date}</Text> : null}
          {tag ? <Text style={styles.tag}>{tag}</Text> : null}
          {title ? <Text variant='h4' numberOfLines={2}>{title}</Text> : null}
          {subtitle ? <Text variant='p' numberOfLines={2}>{subtitle}</Text> : null}
        </View>
      </View>
    </View>
  );
}

interface CardStackedResponsiveProps extends CardStackedProps {
  aspectRatioCompact?: [number, number]
  aspectRatioStacked?: [number, number]
  tag?: string
}

export function CardStackedResponsive({
  aspectRatioCompact,
  aspectRatioStacked,
  ...rest
}: CardStackedResponsiveProps) {
  return (
    <Grid.Row>
      {/* Desktop */}
      <Grid.Col 
        xs={0}
        md={24}
      >
        <CardStacked
          {...rest}
          aspectRatio={aspectRatioStacked || rest.aspectRatio}
        />
      </Grid.Col>
      {/* Mobile */}
      <Grid.Col 
        xs={24}
        md={0}
      >
        <CardCompact
          {...rest}
          aspectRatio={aspectRatioCompact || rest.aspectRatio}
        />
      </Grid.Col>
    </Grid.Row>
  )
}

type CardImageProps = {
  title?: string
  image: string
  aspectRatio?: [number, number]
  date?: string
  onPress: () => any,
  id: string
}

function CardImage({
  title,
  image,
  aspectRatio,
  date,
  onPress,
  id
}: CardImageProps) {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <TouchableOpacity
      style={styles.cardLink}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageCard}>
        <SharedElement id={`card.${id}.image`} style={styles.fill}>
          <Image
            source={{uri: image}}
            style={styles.image}
            resizeMode='cover'
            resizeMethod="resize"
          />
        </SharedElement>

        {aspectRatio ? (
          <AspectRatioView 
            aspectRatio={aspectRatio}
            style={{width: '100%'}}
          /> 
        ) : <View style={{flex: 1}}/>}

        <SharedElement id={`card.${id}.overlay`} style={styles.imageCardOverlay}>
          <LinearGradient
            style={styles.fill}
            colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
          />
        </SharedElement>

        <View style={styles.imageCardTitleWrap}>
          {title ? (
            <SharedElement id={`card.${id}.title`}>
              <Text variant='h3' numberOfLines={2} style={styles.imageCardTitle} noPadding>{title}</Text>
            </SharedElement>
          ) : null}
          {date ? (
            <SharedElement id={`card.${id}.date`}>
              <Text variant='h6' style={styles.subtitle} noPadding>{date}</Text>
            </SharedElement>
          ) : null}
        </View>
      </View> 
    </TouchableOpacity>
  );
}

interface CardImageResponsiveProps extends CardImageProps {
  aspectRatioMobile?: [number, number]
  aspectRatioDesktop?: [number, number]
  tag?: string
}

export function CardImageResponsive({
  aspectRatioMobile,
  aspectRatioDesktop,
  ...rest
}: CardImageResponsiveProps) {
  return (
    <Grid.Row>
      {/* Desktop */}
      <Grid.Col 
        xs={0}
        md={24}
      >
        <CardImage
          {...rest}
          aspectRatio={aspectRatioDesktop || rest.aspectRatio}
        />
      </Grid.Col>
      {/* Mobile */}
      <Grid.Col 
        xs={24}
        md={0}
      >
        <CardCompact
          {...rest}
          aspectRatio={aspectRatioMobile || rest.aspectRatio}
        />
      </Grid.Col>
    </Grid.Row>
  )
}

export function CardImageResponsiveAspectRatio({
  aspectRatioMobile,
  aspectRatioDesktop,
  ...rest
}: CardImageResponsiveProps) {
  return (
    <Grid.Row>
      {/* Desktop */}
      <Grid.Col 
        xs={0}
        md={24}
      >
        <CardImage
          {...rest}
          aspectRatio={aspectRatioDesktop || rest.aspectRatio}
        />
      </Grid.Col>
      {/* Mobile */}
      <Grid.Col 
        xs={24}
        md={0}
      >
        <CardImage
          {...rest}
          aspectRatio={aspectRatioMobile || rest.aspectRatio}
        />
      </Grid.Col>
    </Grid.Row>
  )
}

const styleCreator =  Theme.makeStyleCreator(theme => ({  
  stackedCard: {
    ...styleHelpers.flex(),
    ...styleHelpers.card(theme),
    flex: 1,
    marginBottom: theme.spacing(1)
  },
  compactCard: {
    ...styleHelpers.flex('row'),
    marginBottom: theme.spacing(1),
    flex: 1
  },
  compactCardImageWrap: {
    ...styleHelpers.lockWidth('40%')
  },
  image: {
    borderRadius: theme.roundness(1),
    overflow: 'hidden',
    width: '100%',
    height: '100%'
  },
  cardBody: {
    ...styleHelpers.flex('column'),
    padding: theme.spacing(1.5),
    flex: 1,
    alignItems: 'flex-start'
  },
  imageCard: {
    ...styleHelpers.card(theme),
    borderWidth: 0,
    width: '100%',
    alignItems: 'flex-end',
    position: 'relative',
    ...styleHelpers.centerBackgroundImage(),
    marginBottom: theme.spacing(1),
    flex: 1,
    backgroundColor: 'transparent'
  },
  backgroundImgae: {
    height: '100%',
    display: 'flex',
    ...styleHelpers.centerBackgroundImage()
  },
  imageCardOverlay: {
    ...styleHelpers.absoluteFill()
  },
  imageCardTitle: {
    color: '#fff'
  },
  subtitle: {
    color: theme.colors.textMuted,
    marginTop: theme.spacing(1)
  },
  imageCardTitleWrap: {
    ...styleHelpers.absoluteFill(),
    padding: theme.spacing(2),
    justifyContent: 'flex-end'
  },
  tag: {
    display: 'flex',
    color: '#fff',
    backgroundColor: theme.colors.accent,
    // padding: theme.spacing(0.5, 1),
    marginBottom: theme.spacing(1),
  },
  cardLink: {
    flex: 1
  },
  date: {
    color: theme.colors.textMuted
  },
  fill: {
    height: '100%',
    width: '100%'
  }
}));

export const Card = {
  Compact: CardCompact,
  Stacked: CardStacked,
  StackedResponsive: CardStackedResponsive,
  Image: CardImage,
  ImageResponsive: CardImageResponsive,
  ImageResponsiveAspectRatio: CardImageResponsiveAspectRatio,
}

export default Card;