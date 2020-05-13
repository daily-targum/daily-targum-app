/**
 * THIS IS A HACK!!!
 * Shhhhhh, we are pretending that the
 * browser library is the node one to
 * keep React Native and TypeScript happy
 */

// @ts-ignore
import { createClient } from 'contentful/dist/contentful.browser.min.js';
import { ContentfulClientApi } from 'contentful';
import Constants from 'expo-constants';

export const client: ContentfulClientApi = createClient({
  space: Constants.manifest.extra.CONTENTFUL_SPACE,
  accessToken: Constants.manifest.extra.CONTENTFUL_ACCESS_TOKEN
});

export const drafts: ContentfulClientApi = createClient({
  host: 'preview.contentful.com',
  space: Constants.manifest.extra.CONTENTFUL_SPACE,
  accessToken: Constants.manifest.extra.CONTENTFUL_ACCESS_TOKEN_DRAFTS
});