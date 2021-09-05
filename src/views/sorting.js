import { createElement } from '../utils/dom.js';

const SORTINGS = [
  {
    title: 'Day',
    isActive: true,
    isDisabled: false,
  },
  {
    title: 'Event',
    isActive: false,
    isDisabled: true,
  },
  {
    title: 'Time',
    isActive: false,
    isDisabled: false,
  },
  {
    title: 'Price',
    isActive: false,
    isDisabled: false,
  },
  {
    title: 'Offers',
    isActive: false,
    isDisabled: false,
  },
];

const createSortingItenTemplate = ({title, isActive, isDisable}) => (
  `<div class="trip-sort__item  trip-sort__item--${title.toLowerCase()}">
    <input id="sort-${title.toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${title.toLowerCase()}" ${isActive ? 'checked' : ''} ${isDisable ? 'disabled' : ''}>
    <label class="trip-sort__btn" for="sort-${title.toLowerCase()}">${title}</label>
  </div>`
);

export const createSortingTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${SORTINGS.map((sorting) => createSortingItenTemplate(sorting)).join('')}
  </form>`
);

export default class Sorting {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortingTemplate();
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
