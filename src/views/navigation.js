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
