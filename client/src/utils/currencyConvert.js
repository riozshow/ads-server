export const currencyConvert = (price) =>
  parseInt(price).toLocaleString('de-DE', {
    style: 'currency',
    currency: 'USD',
  });
