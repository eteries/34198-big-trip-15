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
import { dateFrom, dateTo} from './date.js';

const EventPrice = {
  MIN: 50,
  MAX: 1500,
};

const IdRange = {
  MIN: 1,
  MAX: 9999,
};

export function generateTripEvent () {
  return {
    basePrice: getRandomInt(EventPrice.MIN, EventPrice.MAX),
    dateFrom,
    dateTo,
    destination: generateDestination(),
    id: getUniqueRandomInt(IdRange.MIN, IdRange.MAX)(),
    offers: getRandomSubArray(offer.offers),
    description: getRandomSubPhrase(MOCK_TEXT),
    type: getRandomArrayElement(tripEventTypes),
  };
}
