import { generateDestination } from './destination.js';
import { offer } from './offer.js';
import {
  getRandomArrayElement,
  getRandomInt,
  getRandomSubArray,
  getRandomSubPhrase,
  getUniqueRandomInt
} from '../utils/random.js';
import { tripEventTypes } from './event-types.js';
import { MOCK_TEXT } from './text.js';
import { generateDateFrom, generateDateTo } from './date.js';

const EventPrice = {
  MIN: 50,
  MAX: 1000,
};

const IdRange = {
  MIN: 1,
  MAX: 9999,
};

export function generateTripEvent () {
  const dateFrom = generateDateFrom();
  const dateTo = generateDateTo(dateFrom);

  return {
    basePrice: getRandomInt(EventPrice.MIN, EventPrice.MAX),
    dateFrom,
    dateTo,
    destination: generateDestination(),
    isFavorite: Boolean(getRandomInt(0,1)),
    id: getUniqueRandomInt(IdRange.MIN, IdRange.MAX)(),
    offers: getRandomSubArray(offer.offers),
    description: getRandomSubPhrase(MOCK_TEXT),
    type: getRandomArrayElement(tripEventTypes),
  };
}
