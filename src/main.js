import TripInfoView from './views/trip-info.js';
import TripRouteView from './views/trip-route.js';
import TripCostView from './views/trip-cost.js';
import StatisticsView from './views/statistics.js';
import LoadingView from './views/loading.js';
import TripEventsView from './views/trip-events.js';
import TripEvent from './views/trip-event.js';
import TripEventEdit from './views/trip-event-edit.js';
import NavigationView from './views/navigation.js';
import FiltersView from './views/filters.js';
import SortingView from './views/sorting.js';

import { generateTripEvent } from './mock/trip-event.js';
import { getUnixDate } from './utils/date.js';
import { Positions, renderElement } from './utils/dom.js';

generateTripEvent();

const RENDERED_EVENTS_NUMBER = 15;

const TRIP_EVENTS = new Array(RENDERED_EVENTS_NUMBER)
  .fill(null)
  .map(() => generateTripEvent())
  .sort(((eventA, eventB) => getUnixDate(eventA.dateFrom) - getUnixDate(eventB.dateFrom)));

const tripMainElement = document.querySelector('.trip-main');
const tripInfoView = new TripInfoView();
renderElement(tripMainElement, tripInfoView.getElement(), Positions.AFTER_BEGIN);

renderElement(tripInfoView.getElement(), new TripRouteView(TRIP_EVENTS).getElement(), Positions.BEFORE_END);
renderElement(tripInfoView.getElement(), new TripCostView(TRIP_EVENTS).getElement(), Positions.BEFORE_END);

const controlsElement = tripMainElement.querySelector('.trip-controls');
renderElement(controlsElement, new NavigationView().getElement(), Positions.BEFORE_END);
renderElement(controlsElement, new FiltersView().getElement(), Positions.BEFORE_END);

const pageTripEventsElement = document.querySelector('.trip-events');
renderElement(pageTripEventsElement, new SortingView().getElement(), Positions.BEFORE_END);
renderElement(pageTripEventsElement, new TripEventsView().getElement(), Positions.BEFORE_END);
renderElement(pageTripEventsElement, new LoadingView().getElement(), Positions.BEFORE_END);
renderElement(pageTripEventsElement, new StatisticsView().getElement(), Positions.AFTER_END);

const pageEventListElement = pageTripEventsElement.querySelector('.trip-events__list');
renderElement(pageEventListElement, new TripEventEdit(generateTripEvent()).getElement(), Positions.BEFORE_END);
TRIP_EVENTS
  .forEach((tripEvent) => renderElement(pageEventListElement, new TripEvent(tripEvent).getElement(), Positions.BEFORE_END));

