jest.mock('@react-navigation/core', () => {
  const navigate = jest.fn();
  return {
    useNavigation: () => ({
      navigate
    })
  };
});

jest.mock('../Theme');

import React from 'react';
import ArticleCard from '../ArticleCard';
import rederer from 'react-test-renderer';
import { useNavigation } from '@react-navigation/core'
import { TouchableOpacity } from 'react-native';
import { ARTICLE } from '../../shared/src/client/actions/__mocks__/articles';
import * as share from '../../utils/share';
jest.spyOn(share, 'shareArticle');

describe('<ArticleCard />', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('small card renders correctly', () => {
    const tree = rederer.create(
      <ArticleCard.Small article={ARTICLE} width='100%'/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('small card handle press', () => {
    const tree = rederer.create(
      <ArticleCard.Small article={ARTICLE} width='100%'/>
    );
    tree.root.findByType(TouchableOpacity).props.onPress();
    expect(useNavigation().navigate).toBeCalledTimes(1);
  });

  it('small card handle long press', () => {
    const tree = rederer.create(
      <ArticleCard.Small article={ARTICLE} width='100%'/>
    );
    tree.root.findByType(TouchableOpacity).props.onLongPress();
    expect(share.shareArticle).toBeCalledTimes(1);
  });

  it('medium card renders correctly', () => {
    const tree = rederer.create(
      <ArticleCard.Medium article={ARTICLE}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('medium card handle press', () => {
    const tree = rederer.create(
      <ArticleCard.Medium article={ARTICLE}/>
    );
    tree.root.findByType(TouchableOpacity).props.onPress();
    expect(useNavigation().navigate).toBeCalledTimes(1);
  });

  it('medium card handle long press', () => {
    const tree = rederer.create(
      <ArticleCard.Medium article={ARTICLE}/>
    );
    tree.root.findByType(TouchableOpacity).props.onLongPress();
    expect(share.shareArticle).toBeCalledTimes(1);
  });
});