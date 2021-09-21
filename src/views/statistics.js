import AbstractView from './abstract-view';

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

export default class Statistics extends AbstractView {
  getTemplate() {
    return createStatisticsTemplate();
  }
}
