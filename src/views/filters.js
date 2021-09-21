import AbstractView from './abstract-view';

const FILTERS = [
  {
    title: 'Everything',
    isActive: true,
  },
  {
    title: 'Future',
    isActive: false,
  },
  {
    title: 'Past',
    isActive: false,
  },
];

const createFilterItemTemplate = ({title, isActive}) => (
  `<div class="trip-filters__filter">
    <input id="filter-${title.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${title.toLowerCase()}" ${isActive ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${title.toLowerCase()}">${title}</label>
  </div>`
);

export const createFiltersTemplate = () => (
  `<form class="trip-filters" action="#" method="get">
    ${FILTERS.map((filter) => createFilterItemTemplate(filter)). join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class Filters extends AbstractView {
  getTemplate() {
    return createFiltersTemplate();
  }
}
