import { createElement } from '../utils/dom';

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate an AbstractView, only a concrete one');
    }

    this._element = null;
    this._callbacks = {};
  }

  getTemplate() {
    throw new Error('The method getTemplate hasn\'t implemented');
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
