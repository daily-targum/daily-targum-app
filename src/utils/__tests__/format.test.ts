import dayjs from 'dayjs';
import { formatDate, formatDateAbriviated } from '../format';

describe('formatDateAbriviated', () => {

  it('now', () => {
    const date = dayjs();
    expect(formatDateAbriviated(date.toDate())).toBe('Now');
  });

  it('one minute ago', () => {
    const date = dayjs().subtract(1, 'minute');
    expect(formatDateAbriviated(date.toDate())).toBe('1 minute ago');
  });

  it('ten minutes ago', () => {
    const date = dayjs().subtract(10, 'minute');
    expect(formatDateAbriviated(date.toDate())).toBe('10 minutes ago');
  });

  it('thirty minutes ago', () => {
    const date = dayjs().subtract(30, 'minute');
    expect(formatDateAbriviated(date.toDate())).toBe('30 minutes ago');
  });

  it('fifty minutes ago', () => {
    const date = dayjs().subtract(50, 'minute');
    expect(formatDateAbriviated(date.toDate())).toBe('50 minutes ago');
  });

  it('one hour ago', () => {
    const date = dayjs().subtract(1, 'hour');
    expect(formatDateAbriviated(date.toDate())).toBe('1 hour ago');
  });

  it('two hours ago', () => {
    const date = dayjs().subtract(2, 'hour');
    expect(formatDateAbriviated(date.toDate())).toBe('2 hours ago');
  });

  it('twelve hours ago', () => {
    const date = dayjs().subtract(12, 'hour');
    expect(formatDateAbriviated(date.toDate())).toBe('12 hours ago');
  });

  it('twenty-three hours ago', () => {
    const date = dayjs().subtract(23, 'hour');
    expect(formatDateAbriviated(date.toDate())).toBe('23 hours ago');
  });

  it('one week ago', () => {
    const date = dayjs().subtract(1, 'week');
    expect(formatDateAbriviated(date.toDate())).toBe(date.format('MMM D'));
  });

  it('two week ago', () => {
    const date = dayjs().subtract(2, 'week');
    expect(formatDateAbriviated(date.toDate())).toBe(date.format('MMM D'));
  });

  it('one year ago', () => {
    const date = dayjs().subtract(1, 'year');
    expect(formatDateAbriviated(date.toDate())).toBe(date.format('MMM D YYYY'));
  });

  it('two years ago', () => {
    const date = dayjs().subtract(2, 'year');
    expect(formatDateAbriviated(date.toDate())).toBe(date.format('MMM D YYYY'));
  });

});


const DATE_FORMAT = 'MMM D, YYYY, h:mm A';
describe('formatDate', () => {

  it('now', () => {
    const date = dayjs();
    expect(formatDate(date.toDate())).toBe(date.format(DATE_FORMAT));
  });

  it('one minute ago', () => {
    const date = dayjs().subtract(1, 'minute');
    expect(formatDate(date.toDate())).toBe(date.format(DATE_FORMAT));
  });

  it('ten minutes ago', () => {
    const date = dayjs().subtract(10, 'minute');
    expect(formatDate(date.toDate())).toBe(date.format(DATE_FORMAT));
  });

  it('thirty minutes ago', () => {
    const date = dayjs().subtract(30, 'minute');
    expect(formatDate(date.toDate())).toBe(date.format(DATE_FORMAT));
  });

  it('fifty minutes ago', () => {
    const date = dayjs().subtract(50, 'minute');
    expect(formatDate(date.toDate())).toBe(date.format(DATE_FORMAT));
  });

  it('one hour ago', () => {
    const date = dayjs().subtract(1, 'hour');
    expect(formatDate(date.toDate())).toBe(date.format(DATE_FORMAT));
  });

  it('two hours ago', () => {
    const date = dayjs().subtract(2, 'hour');
    expect(formatDate(date.toDate())).toBe(date.format(DATE_FORMAT));
  });

  it('twelve hours ago', () => {
    const date = dayjs().subtract(12, 'hour');
    expect(formatDate(date.toDate())).toBe(date.format(DATE_FORMAT));
  });

  it('twenty-three hours ago', () => {
    const date = dayjs().subtract(23, 'hour');
    expect(formatDate(date.toDate())).toBe(date.format(DATE_FORMAT));
  });

  it('one week ago', () => {
    const date = dayjs().subtract(1, 'week');
    expect(formatDate(date.toDate())).toBe(date.format(DATE_FORMAT));
  });

  it('two week ago', () => {
    const date = dayjs().subtract(2, 'week');
    expect(formatDate(date.toDate())).toBe(date.format(DATE_FORMAT));
  });

  it('one year ago', () => {
    const date = dayjs().subtract(1, 'year');
    expect(formatDate(date.toDate())).toBe(date.format(DATE_FORMAT));
  });

  it('two years ago', () => {
    const date = dayjs().subtract(2, 'year');
    expect(formatDate(date.toDate())).toBe(date.format(DATE_FORMAT));
  });

});