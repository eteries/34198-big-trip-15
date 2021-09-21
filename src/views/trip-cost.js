import AbstractView from './abstract-view';

export const createTripCostTemplate = (events) => {
  const cost = events.reduce((sum, current) => sum + current.basePrice, 0);
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>`;
};

export default class TripCost extends AbstractView {
  constructor(tripEvents) {
    super();

    this._tripEvents = tripEvents;
  }

  getTemplate() {
    return createTripCostTemplate(this._tripEvents);
  }
}
