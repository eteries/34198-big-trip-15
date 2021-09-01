import { formatTripInterval } from '../utils/date.js';
import { createElement } from '../utils/dom.js';

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

export default class TripRoute {
  constructor(tripEvents) {
    this._element = null;
    this._tripEvents = tripEvents;
  }

  getTemplate() {
    return createTripRouteTemplate(this._tripEvents);
  }

  getElement() {
    if (this._element) {
      return this._element;
    }

    return createElement(this.getTemplate());
  }

  removeElement() {
    this._element.parentNode.removeChild(this._element);
  }
}
