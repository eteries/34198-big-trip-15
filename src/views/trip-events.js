import { createElement } from '../utils/dom.js';

const createTripEventsTemplate = (tripEventsNum) => (
  tripEventsNum
    ? '<ul class="trip-events__list"></ul>'
    : '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class TripEvents {
  constructor(tripEventsNum) {
    this._element = null;
    this._tripEventsNum = tripEventsNum;
  }

  getTemplate() {
    return createTripEventsTemplate(this._tripEventsNum);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element.parentNode.removeChild(this._element);
  }
}
