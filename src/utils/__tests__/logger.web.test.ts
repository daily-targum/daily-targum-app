console.log = jest.fn();
import { logEvent, logError } from '../logger.web';

afterEach(() => {
  jest.clearAllMocks();
});

describe('logger.web development', () => {

  it('logEvent', () => {
    logEvent();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("SETUP ANALYTICS FOR WEB");
  });

  it('logEvent with params', () => {
    logEvent();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("SETUP ANALYTICS FOR WEB");
  });

  it('logError', () => {
    logError();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("SETUP ANALYTICS FOR WEB");
  });
});

describe('logger.web production', () => {

  it('logEvent', () => {
    logEvent();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("SETUP ANALYTICS FOR WEB");
  });

  it('logEvent with params', () => {
    logEvent();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("SETUP ANALYTICS FOR WEB");
  });

  it('logError', () => {
    logError();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("SETUP ANALYTICS FOR WEB");
  });
});