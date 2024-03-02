export const ORIGIN =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/'
    : window.location.origin + '/';
