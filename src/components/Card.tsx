import React from 'react';
import Theme from './Theme';
import Text from './Text';
import Grid from './Grid/native';
import { AspectRatioView } from './AspectRatioView';
import { styleHelpers } from '../utils';
import { View, ViewStyle, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


function CardCompact({
  title,
  subtitle,
  tag,
  image,
  aspectRatio,
  date,
  style,
  onPress
}: {
  title?: string
  subtitle?: string
  tag?: string
  image: string
  aspectRatio?: [number, number]
  date?: string,
  style?: ViewStyle
  onPress?: () => any
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <TouchableOpacity 
      style={styles.cardLink}
      onPress={onPress}
    >
      <View style={[styles.compactCard, style]}>
        <Image
          source={{uri: image}}
          style={[
            styles.compactCardImage,
            {
              aspectRatio: aspectRatio ? (aspectRatio[0] / aspectRatio[1]) : undefined
            }
          ]}
          resizeMethod="resize"
        />
        <View style={styles.cardBody}>
          {date ? <Text variant='h6' style={styles.date}>{date}</Text> : null}
          {tag ? <Text style={styles.tag}>{tag}</Text> : null}
          {title ? (
            <Text 
              variant='h5' 
              numberOfLines={3} 
              lockNumberOfLines
              noPadding
            >
              {title}
            </Text>
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
          source={{uri: image+'?h=260&w=400&fit=crop&crop=faces,center'}}
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
  onPress: () => any
}

function CardImage({
  title,
  image,
  aspectRatio,
  date,
  onPress
}: CardImageProps) {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <TouchableOpacity
      style={styles.cardLink}
      onPress={onPress}
    >
      <ImageBackground
        style={styles.imageCard}
        source={{uri: image}}
      >
        {aspectRatio ? (
          <AspectRatioView 
            aspectRatio={aspectRatio}
            style={{width: '100%'}}
          /> 
        ) : <View style={{flex: 1}}/>}
        <View style={styles.imageCardOverlay}/>
        <LinearGradient
          style={styles.imageCardOverlay}
          colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
        />

        <View style={styles.imageCardTitleWrap}>
          {date ? <Text variant='h6' style={styles.imageCardSubtitle} noPadding>{date}</Text> : null}
          {title ? <Text variant='h3' numberOfLines={2} style={styles.imageCardTitle} noPadding>{title}</Text> : null}
        </View>
      </ImageBackground>
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
  compactCardImage: {
    ...styleHelpers.lockWidth('40%'),
    borderRadius: theme.roundness(1),
    overflow: 'hidden'
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
    flex: 1
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
  imageCardSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    marginBottom: theme.spacing(1)
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