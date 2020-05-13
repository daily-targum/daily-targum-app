// ENVIRONMENT VARIABLES

export default {
  appOwnership: 'expo',
  manifest: {
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
  }
};