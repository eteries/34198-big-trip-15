import AbstractView from './abstract-view';

const createTripEventsTemplate = (tripEventsNum) => (
  tripEventsNum
    ? '<ul class="trip-events__list"></ul>'
    : '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class TripEvents extends AbstractView {
  constructor(tripEventsNum) {
    super();

    this._tripEventsNum = tripEventsNum;
  }

  getTemplate() {
    return createTripEventsTemplate(this._tripEventsNum);
  }
}
