import { formatTripInterval } from '../utils/date.js';

export const createTripRouteTemplate = (tripEvents) => {
  const uniqueCities = [...new Set(tripEvents.map(({destination = {}}) => destination.name))];
  const route = uniqueCities.length < 4
    ? `${uniqueCities.join(' - ')}`
    : `${uniqueCities[0]} ... ${uniqueCities[uniqueCities.length - 1]}`;
  const dateFrom = tripEvents[0].dateFrom;
  const dateTo = tripEvents[tripEvents.length - 1].dateTo;

  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${route}</h1>

    <p class="trip-info__dates">${formatTripInterval(dateFrom, dateTo)}</p>
  </div>`;
};
