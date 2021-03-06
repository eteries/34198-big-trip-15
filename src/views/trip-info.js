import { createElement } from '../utils/dom.js';

const createTripInfoTemplate = () => '<section class="trip-main__trip-info  trip-info"></section>';

export default class TripInfo {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate();
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
