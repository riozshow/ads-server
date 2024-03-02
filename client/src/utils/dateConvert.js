const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const dateConvert = {
  date: (date) => new Date(date).toLocaleString('pl-PL', options),
  time: (date) => new Date(date).toLocaleTimeString('pl-PL'),
};
