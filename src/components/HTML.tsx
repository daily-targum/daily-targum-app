import React from 'react';
import HTMLView from 'react-native-htmlview';
import { openLink, shareUrl } from '../utils';
import Text from './Text';
import { useNavigation } from '@react-navigation/core';

export function HTML({
  html
}: {
  html: string
}) {
  const textStyles = Text.useStyles();
  const navigation = useNavigation();
  return (
    <HTMLView
      onLinkPress={url => openLink({url, navigation})}
      onLinkLongPress={url => shareUrl(url)}
      stylesheet={textStyles}
      value={html}
      addLineBreaks={false}
    />
  )
}

export default HTML;