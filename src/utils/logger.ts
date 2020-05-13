import * as Amplitude from 'expo-analytics-amplitude';
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';

let isDev: boolean = __DEV__ || Constants.appOwnership === 'expo';

export function logEvent({
  event,
  props
}: {
  event: string,
  props?: any
}) {
  if (isDev) {
    // tslint:disable-next-line
    console.log('logger: logEvent', {
      event,
      props
    });
    return;
  } else if (typeof props === 'object') {
    Amplitude.logEventWithProperties(event, props);
  }

  else{
    Amplitude.logEvent(event);
  }
}

export async function initialize({
  enableInDevelopment = false
}: { 
  enableInDevelopment?: boolean 
}) {
  if(enableInDevelopment){
    isDev = false;
  } else if(isDev) {
    return;
  }

  const { installationId } = Constants;
  Amplitude.initialize(Constants.manifest.extra.AMPLITUDE_KEY);
  Amplitude.setUserId(installationId);

  Sentry.init({
    dsn: Constants.manifest.extra.SENTRY_DSN,
    enableInExpoDevelopment: false,
    debug: false
  });
  Sentry.setRelease(Constants.manifest.revisionId || 'unknown');
  Sentry.setUser({ userID: installationId });
}


export function logError(err: Error | string) {
  if(isDev) {
    // tslint:disable-next-line
    console.log('logger: logError', err);
    // throw err;
  } else{
    Sentry.captureException(err);
  }
}