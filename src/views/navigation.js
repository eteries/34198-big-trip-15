import { createElement } from '../utils/dom.js';

const TABS = [
  {
    title: 'Table',
    isActive: true,
  },
  {
    title: 'Stats',
    isActive: false,
  },
];

export const createNavigationTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    ${TABS.map(({title, isActive}) => (
    `<a class="trip-tabs__btn ${isActive ? 'trip-tabs__btn--active' : ''}" href="#">${title}</a>`
  )).join('')}
  </nav>`
);

export default class Navigation {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNavigationTemplate();
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
