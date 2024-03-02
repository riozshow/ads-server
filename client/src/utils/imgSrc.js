import { ORIGIN } from '../config';

export const imageSrc = (image) =>
  image ? ORIGIN + 'api/images/' + image : '/images/no-image.png';
