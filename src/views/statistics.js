import { createElement } from '../utils/dom.js';

const STATISTICS_ITEMS = [
  {title: 'money'},
  {title: 'type'},
  {title: 'time-spend'},
];

export const createStatisticsTemplate = () => (
  `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    ${STATISTICS_ITEMS.map(({title}) => (
    `<div class="statistics__item">
      <canvas class="statistics__chart" id="${title}" width="900"></canvas>
    </div>`
  )).join('')}`
);

export default class Statistics {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createStatisticsTemplate();
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
