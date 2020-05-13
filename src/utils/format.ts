import dayjs from 'dayjs';

export const formatDateAbriviated = (date: string | Date): string => {
  const now = dayjs();
  const articleDate = dayjs(date);
  const minDiff = now.diff(articleDate, 'minute');
  const hourDiff = now.diff(articleDate, 'hour');
  const dayDiff = now.diff(articleDate, 'day');
  const yearDiff = now.diff(articleDate, 'year');

  if(minDiff < 1) {
    return 'Now';
  } else if(minDiff === 1) {
    return `${minDiff} minute ago`;
  } else if(minDiff < 60) {
    return `${minDiff} minutes ago`;
  } else if(hourDiff === 1) {
    return `${hourDiff} hour ago`;
  } else if(hourDiff < 24) {
    return `${hourDiff} hours ago`;
  } else if(dayDiff === 1) {
    return `${dayDiff} day ago`;
  } else if(dayDiff < 7) {
    return `${dayDiff} days ago`;
  } else if(yearDiff < 1) {
    return articleDate.format('MMM D');
  } else {
    return articleDate.format('MMM D YYYY');
  }
}

export const formatDate = (date: string | Date) => {
  return dayjs(date).format('MMM D, YYYY, h:mm A');
}