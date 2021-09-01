import { createElement } from '../utils/dom.js';

const createTripEventsTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TripEvents {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripEventsTemplate();
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
