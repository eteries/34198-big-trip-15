export const createTripCostTemplate = (events) => {
  const cost = events.reduce((sum, current) => sum + current.basePrice, 0);
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>`;
};
