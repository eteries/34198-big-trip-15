import TripInfoView from './views/trip-info.js';
import TripRouteView from './views/trip-route.js';
import TripCostView from './views/trip-cost.js';
import StatisticsView from './views/statistics.js';
import LoadingView from './views/loading.js';
import TripEventsView from './views/trip-events.js';
import TripEventView from './views/trip-event.js';
import TripEventEditView from './views/trip-event-edit.js';
import NavigationView from './views/navigation.js';
import FiltersView from './views/filters.js';
import SortingView from './views/sorting.js';

import { generateTripEvent } from './mock/trip-event.js';
import { getUnixDate } from './utils/date.js';
import {isEscape, Positions, render, replace} from './utils/dom.js';

generateTripEvent();

const RENDERED_EVENTS_NUMBER = 17;

const TRIP_EVENTS = new Array(RENDERED_EVENTS_NUMBER)
  .fill(null)
  .map(() => generateTripEvent())
  .sort(((eventA, eventB) => getUnixDate(eventA.dateFrom) - getUnixDate(eventB.dateFrom)));

const tripMainElement = document.querySelector('.trip-main');
const tripInfoView = new TripInfoView();
render(tripMainElement, tripInfoView, Positions.AFTER_BEGIN);

render(tripInfoView, new TripRouteView(TRIP_EVENTS), Positions.BEFORE_END);
render(tripInfoView, new TripCostView(TRIP_EVENTS), Positions.BEFORE_END);

const controlsElement = tripMainElement.querySelector('.trip-controls');
render(controlsElement, new NavigationView(), Positions.BEFORE_END);
render(controlsElement, new FiltersView(), Positions.BEFORE_END);

const pageTripEventsElement = document.querySelector('.trip-events');
render(pageTripEventsElement, new SortingView(), Positions.BEFORE_END);
render(pageTripEventsElement, new TripEventsView(TRIP_EVENTS.length), Positions.BEFORE_END);
render(pageTripEventsElement, new LoadingView(), Positions.BEFORE_END);
render(pageTripEventsElement, new StatisticsView(), Positions.AFTER_END);

const pageEventListElement = pageTripEventsElement.querySelector('.trip-events__list');

const renderEventElement = (tripEventData) => {
  const tripEventView = new TripEventView(tripEventData);
  const tripEventEditView = new TripEventEditView(tripEventData);

  const openEditor = () => replace(tripEventView, tripEventEditView);
  const closeEditor = () => replace(tripEventEditView, tripEventView);

  const onDocumentKeyDown = (evt) => {
    if (isEscape(evt)) {
      closeEditor();
    }
  };

  tripEventView.setOnOpenClick(() => {
    openEditor();
    document.addEventListener('keydown', onDocumentKeyDown);
  });

  tripEventEditView.setOnCloseClick(() => {
    closeEditor();
    document.removeEventListener('keydown', onDocumentKeyDown);
  });

  tripEventEditView.setOnSubmit(() => {
    closeEditor();
    document.removeEventListener('keydown', onDocumentKeyDown);
  });

  render(pageEventListElement, tripEventView, Positions.BEFORE_END);
};

if (TRIP_EVENTS.length) {
  TRIP_EVENTS.forEach((tripEventData) => renderEventElement(tripEventData));
}
