import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const getDuration = (dateFrom, dateTo) => dayjs(dateTo).valueOf() - dayjs(dateFrom).valueOf();

const formatDate = (date, format) => dayjs(date).format(format);

const formatDuration = (eventDuration) => {
  const parsedDuration = dayjs.duration(eventDuration);
  const durationElements = [
    ['D', parsedDuration.days()],
    ['H', parsedDuration.hours()],
    ['M', parsedDuration.minutes()],
  ];
  return durationElements.reduce((result, element) => {
    const [label, value] = element;
    return value ? result += `${value}${label} ` : result;
  }, '');
};

const getUnixDate = (date) => dayjs(date).valueOf();

const addTimeInterval = (date, interval, unit) => dayjs(date).add(interval, unit).valueOf();

const subtractTimeInterval = (date, interval, unit) => dayjs(date).subtract(interval, unit).valueOf();

export { getDuration, formatDuration, formatDate, getUnixDate, addTimeInterval, subtractTimeInterval };
