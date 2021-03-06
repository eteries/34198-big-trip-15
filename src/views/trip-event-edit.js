import { tripEventTypes } from '../mock/event-types.js';
import { destinations } from '../mock/destinations.js';
import { offers as availableOffers } from '../mock/offers.js';
import { formatDate } from '../utils/date.js';
import { createElement } from '../utils/dom.js';

const EMPTY_TRIP_EVENT = {
  type: 'bus',
  destination: {
    name: '',
    description: '',
    pictures: [],
  },
  dateFrom: null,
  dateTo: null,
  basePrice: '',
  offers: [],
};

const createEventTypeTemplate = (type, currentType) => (
  `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === currentType ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type}-1">${type}</label>
  </div>`
);

const createEventTypesTemplate = (currentType) => (
  tripEventTypes
    .map((type) => createEventTypeTemplate(type, currentType))
    .join('')
);

const getOffersByType = (type) => availableOffers
  .filter((offer) => offer.type === type || offer.type === 'mock')[0].offers;

const createOfferTemplate = (currentOffer, selectedOffers) => (
  `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden"
           id="event-offer-meal-1"
           type="checkbox"
           name="event-offer-meal"
           ${selectedOffers.find(({title}) => title === currentOffer.title) ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-meal-1">
      <span class="event__offer-title">${currentOffer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${currentOffer.price}</span>
    </label>
  </div>`
);

const createTripEventOffersTemplate = (type, selectedOffers) => (
  getOffersByType(type)
    .map((availableOffer) => createOfferTemplate(availableOffer, selectedOffers))
    .join('')
);

const createDestinationSelectTemplate = () => (
  destinations
    .map(({name}) => `<option value="${name}"></option>`)
    .join('')
);

const createPicturesTemplate = (pictures) => (
  pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`).join('')
);

const createTripEventEditTemplate = ({type, destination, dateTo, dateFrom, offers, basePrice } = EMPTY_TRIP_EVENT) => (
  `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createEventTypesTemplate(type)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name ? destination.name : ''}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${createDestinationSelectTemplate(getOffersByType(), offers)};
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom ? formatDate(dateFrom, 'DD/MM/YY hh:mm') : ''}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo ? formatDate(dateTo, 'DD/MM/YY hh:mm') : ''}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${createTripEventOffersTemplate(type, offers)}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${destination.pictures.length ? createPicturesTemplate(destination.pictures) : ''}
            </div>
          </div>
        </section>
      </section>
    </form>
  </li>`
);

export default class TripEventEdit {
  constructor(tripEvent) {
    this._element = null;
    this._tripEvent = tripEvent;
  }

  getTemplate() {
    return createTripEventEditTemplate(this._tripEvent);
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
