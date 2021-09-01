import { createElement } from '../utils/dom.js';

const createLoadingTemplate = () => '<p class="trip-events__msg">Loading...</p>';

export default class Loading {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createLoadingTemplate();
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
