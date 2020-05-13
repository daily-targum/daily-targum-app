console.log = jest.fn();

const mockAmplitude = jest.fn();
jest.mock('expo-analytics-amplitude', () => ({
  logEventWithProperties: (...params: any[]) => mockAmplitude(...params),
  logEvent: (...params: any[]) => mockAmplitude(...params)
}));

const mockSentry = jest.fn();
jest.mock('sentry-expo', () => ({
  captureException: (...params: any[]) => mockSentry(...params)
}));

import { logEvent, logError, initialize } from '../logger';

afterEach(() => {
  jest.clearAllMocks();
});

describe('logger development', () => {

  beforeAll(() => {
    initialize({
      enableInDevelopment: false
    });
  });

  it('logEvent', () => {
    const event: string = 'testEvent';
    logEvent({event});
    expect(mockAmplitude).toHaveBeenCalledTimes(0);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("logger: logEvent", {event});
  });

  it('logEvent with params', () => {
    const event = 'testEventWithParams';
    const params = {
      uuid: 'abcd-efg-hijk-1234',
      data: [1,2,3,4,5,6]
    };
    logEvent({event, props: params});
    expect(mockAmplitude).toHaveBeenCalledTimes(0);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("logger: logEvent", {event, props: params});
  });

  it('logError', () => {
    const error = new Error('this is a test');
    try{
      throw error;
    } catch(err) {
      logError(err);
    }
    expect(mockSentry).toHaveBeenCalledTimes(0);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("logger: logError", error);
  });
});


describe('logger production', () => {

  beforeAll(() => {
    initialize({
      enableInDevelopment: true
    });
  });

  it('logEvent', () => {
    const event: string = 'testEvent';
    logEvent({event});
    expect(mockAmplitude).toHaveBeenCalledTimes(1);
    expect(mockAmplitude).toHaveBeenCalledWith(event);
  });

  it('logEvent with params', () => {
    const event = 'testEventWithParams';
    const params = {
      uuid: 'abcd-efg-hijk-1234',
      data: [1,2,3,4,5,6]
    };
    logEvent({event, props: params});
    expect(mockAmplitude).toHaveBeenCalledTimes(1);
    expect(mockAmplitude).toHaveBeenCalledWith(event, params);
  });

  it('logError', () => {
    const error = new Error('this is a test');
    try{
      throw error;
    } catch(err) {
      logError(err);
    }
    expect(mockSentry).toHaveBeenCalledTimes(1);
    expect(mockSentry).toHaveBeenCalledWith(error);
  });
});
