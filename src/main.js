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
import { isEscape, Positions, renderElement} from './utils/dom.js';

generateTripEvent();

const RENDERED_EVENTS_NUMBER = 17;

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
renderElement(pageTripEventsElement, new TripEventsView(TRIP_EVENTS.length).getElement(), Positions.BEFORE_END);
renderElement(pageTripEventsElement, new LoadingView().getElement(), Positions.BEFORE_END);
renderElement(pageTripEventsElement, new StatisticsView().getElement(), Positions.AFTER_END);

const pageEventListElement = pageTripEventsElement.querySelector('.trip-events__list');

const renderEventElement = (tripEventData) => {
  const tripEventView = new TripEventView(tripEventData);
  const tripEventEditView = new TripEventEditView(tripEventData);

  const openEditor = () => {
    tripEventView.getElement().replaceWith(tripEventEditView.getElement());
  };

  const closeEditor = () => {
    tripEventEditView.getElement().replaceWith(tripEventView.getElement());
  };

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

  renderElement(pageEventListElement, tripEventView.getElement(), Positions.BEFORE_END);
};

if (TRIP_EVENTS.length) {
  TRIP_EVENTS.forEach((tripEventData) => renderEventElement(tripEventData));
}
