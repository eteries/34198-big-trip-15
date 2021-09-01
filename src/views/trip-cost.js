import { createElement } from '../utils/dom.js';

export const createTripCostTemplate = (events) => {
  const cost = events.reduce((sum, current) => sum + current.basePrice, 0);
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>`;
};

export default class TripCost {
  constructor(tripEvents) {
    this._element = null;
    this._tripEvents = tripEvents;
  }

  getTemplate() {
    return createTripCostTemplate(this._tripEvents);
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
