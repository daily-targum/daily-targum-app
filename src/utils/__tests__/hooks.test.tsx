import React from 'react';
import renderer from 'react-test-renderer';
import { useInterval, useDate } from '../hooks';
import dayjs from 'dayjs';

// Percent of renders that date is allowed to be inaccurate
const DATE_ALLOWED_ERROR_PERCENT = 0.02;
const DATE_ITTERATIONS = 100;

jest.useFakeTimers();

describe('hooks', () => {

  it('useInterval', () => {
    const interval = jest.fn();
    function TestInterval() {
      useInterval(interval, 1000);
      return null;
    }
    renderer.create(
      <TestInterval/>
    );
    for(let i = 0; i < 20; i++) {
      renderer.act(() => {
        jest.advanceTimersByTime(1000);
        expect(interval).toHaveBeenCalledTimes(i+1);
      });
    }
  });

  it('useDate seconds', () => {
    const trackRender = jest.fn();
    let offCount = 0;
    let date: dayjs.Dayjs;
    function TestDateHook() {
      date = useDate('second');
      if(date.format('MMM-DD-YYYY hh:mm:ss') !== dayjs().format('MMM-DD-YYYY hh:mm:ss')) {
        offCount++;
      }
      trackRender();
      return null;
    }
    renderer.create(
      <TestDateHook/>
    );
    for(let i = 0; i < DATE_ITTERATIONS; i++) {
      renderer.act(() => {
        jest.advanceTimersByTime(1000);
      })
    }
    expect(trackRender).toHaveBeenCalledTimes(DATE_ITTERATIONS);
    expect(offCount).toBeLessThan(DATE_ITTERATIONS * DATE_ALLOWED_ERROR_PERCENT);
  });

  it('useDate minutes', () => {
    const trackRender = jest.fn();
    let offCount = 0;
    let date: dayjs.Dayjs;
    function TestDateHook() {
      date = useDate('minute');
      if(date.format('MMM-DD-YYYY hh:mm') !== dayjs().format('MMM-DD-YYYY hh:mm')) {
        offCount++;
      }
      trackRender();
      return null;
    }
    renderer.create(
      <TestDateHook/>
    );
    for(let i = 0; i < DATE_ITTERATIONS; i++) {
      renderer.act(() => {
        jest.advanceTimersByTime(1000 * 60);
      })
    }
    expect(trackRender).toHaveBeenCalledTimes(DATE_ITTERATIONS);
    expect(offCount).toBeLessThan(DATE_ITTERATIONS * DATE_ALLOWED_ERROR_PERCENT);
  });

});
