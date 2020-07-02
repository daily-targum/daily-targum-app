import { ExpoConfig, ConfigContext } from '@expo/config';
import './dotenv';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  experiments: {
    redesignedLogBox: true
  },
  name: 'Daily Targum',
  slug: 'daily-targum',
  privacy: 'unlisted',
  platforms: [
    'ios',
    'android',
    'web'
  ],
  version: '2.13.0',
  icon: './src/assets/images/icon.png',
  splash: {
    'image': './src/assets/images/splash.png',
    'resizeMode': 'contain',
    'backgroundColor': '#0a0a0a'
  },
  primaryColor: '#000000',
  orientation: 'portrait',
  updates: {
    enabled: true,
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    requireFullScreen: false,
    supportsTablet: true,
    buildNumber: '3',
    bundleIdentifier: 'com.targum.daily',
    associatedDomains: [
      'applinks:dailytargum.now.sh'
    ],
    infoPlist: {
      LSApplicationQueriesSchemes: [
        'dailytargum'
      ]
    }
  },
  scheme: 'dailytargum',
  android: {
    package: 'com.dailytargum.dailytargum',
    versionCode: 39,
    permissions: [
      'NOTIFICATIONS'
    ],
    googleServicesFile: './google-services.json',
    adaptiveIcon: {
      foregroundImage: './src/assets/images/icon-foreground-layer.png',
      backgroundColor: '#000000'
    },
    intentFilters: [
      {
        action: 'VIEW',
        data: {
          scheme: 'https',
          host: 'dailytargum.now.sh'
        },
        category: [
          'BROWSABLE',
          'DEFAULT'
        ]
      },
      {
        action: 'VIEW',
        data: {
          scheme: 'dailytargum',
          host: 'dailytargum.now.sh'
        },
        category: [
          'BROWSABLE',
          'DEFAULT'
        ]
      }
    ]
  },
  notification: {
    icon: './src/assets/images/notification-logo.png',
    color: '#000000'
  },
  userInterfaceStyle: 'automatic',
  backgroundColor: '#000000',
  description: '',
  hooks: {
    postPublish: [{
      file: 'sentry-expo/upload-sourcemaps',
      config: {
        organization: 'daily-targum',
        project: 'daily-targum-app',
        authToken: process.env.SENTRY_AUTH_TOKEN
      }
    } as any]
  },
  // ENVIRONMENT VARIABLES
  extra: {
    // Sentry Config
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    SENTRY_DSN: process.env.SENTRY_DSN,
    // Amplitude Config
    AMPLITUDE_KEY: process.env.AMPLITUDE_KEY,
    // AWS AppSync Config 
    AWS_APPSYNC_URL: process.env.AWS_APPSYNC_URL,
    AWS_APPSYNC_REGION: process.env.AWS_APPSYNC_REGION,
    AWS_APPSYNC_API_KEY: process.env.AWS_APPSYNC_API_KEY,
    // Contentful
    CONTENTFUL_SPACE: process.env.CONTENTFUL_SPACE,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_ACCESS_TOKEN_DRAFTS: process.env.CONTENTFUL_ACCESS_TOKEN_DRAFTS
  }
});