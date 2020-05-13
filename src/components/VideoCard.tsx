import React from 'react';
import Theme from '../components/Theme';
import { View, Image, TouchableOpacity } from 'react-native';
import { formatDateAbriviated, openLink, shareUrl } from '../utils';
import { LinearGradient } from 'expo-linear-gradient';

function VideoCard({
  video,
  width
}: {
  video: any,
  width: number
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  const media = video['media:group'][0]['media:thumbnail'][0].$.url;
  return (
    <TouchableOpacity 
      onPress={() => openLink({url: video.link[0].$.href})}
      onLongPress={() => shareUrl(video.link[0].$.href)}
      activeOpacity={0.7}
      style={{width}}
    >
      <View style={styles.cardLarge}>
        <Image 
          source={{uri: media}}
          style={styles.cardLargeImage}
          resizeMethod="resize"
        />
        <View
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(100,100,100,0.25)'
          }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  // Large Card
  cardLarge: {
    flexDirection: 'column',
    borderRadius: theme.roundness(1.5),
    overflow: 'hidden'
  },
  cardLargeImage: {
    width: '100%',
    aspectRatio: 1
  },
  cardLargeContent: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    padding: theme.spacing(2)
  },
  cardTitleLarge: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff'
  },
  cardSubtitleLarge: {
    fontSize: 14,
    color: theme.colors.textMuted,
    paddingBottom: theme.spacing(1)
  },
  // All Cards
  cardTitle: {
    fontSize: 14,
    fontWeight: '500'
  },
  cardSubtitle: {
    fontSize: 14,
    color: theme.colors.textMuted,
    paddingBottom: theme.spacing(1)
  }
}));

export default VideoCard;