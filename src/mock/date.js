import { getRandomInt } from '../utils/random.js';
import {formatDate, addTimeInterval, subtractTimeInterval} from '../utils/date.js';

const StartMinutes = {
  MIN: 0,
  MAX: 60*24*14,
};

const DurationMinutes = {
  MIN: 30,
  MAX: 60*24*2,
};

const API_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';

const generateDateFrom = () => {
  const newDate = getRandomInt(0,1)
    ? addTimeInterval(Date.now(), getRandomInt(StartMinutes.MIN, StartMinutes.MAX), 'minute')
    : subtractTimeInterval(Date.now(), getRandomInt(StartMinutes.MIN, StartMinutes.MAX), 'minute');
  return formatDate(newDate, API_DATE_FORMAT);
};

const generateDateTo = (dateFrom) => {
  const newDate = addTimeInterval(dateFrom, getRandomInt(DurationMinutes.MIN, DurationMinutes.MAX), 'minute');
  return formatDate(newDate, API_DATE_FORMAT);
};

export { generateDateFrom, generateDateTo };
