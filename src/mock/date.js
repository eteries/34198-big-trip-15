import dayjs from 'dayjs';
import { getRandomInt } from '../utils/random.js';

const StartDays = {
  MIN: 1,
  MAX: 14,
};

const DurationMinutes = {
  MIN: 30,
  MAX: 60*24*2,
};

const API_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';

const dateFrom = dayjs().add(getRandomInt(StartDays.MIN,StartDays.MAX), 'day').format(API_DATE_FORMAT);
const dateTo = dayjs(dateFrom).add(getRandomInt(DurationMinutes.MIN, DurationMinutes.MAX), 'minute').format(API_DATE_FORMAT);

export { dateFrom, dateTo };
