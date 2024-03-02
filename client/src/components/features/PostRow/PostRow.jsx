import styles from './PostRow.module.scss';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { imageSrc } from '../../../utils/imgSrc';
import { dateConvert } from '../../../utils/dateConvert';
import { currencyConvert } from '../../../utils/currencyConvert';

function PostRow({ _id, image, title, date, price, location }) {
  const [isLoaded, setIsLoaded] = useState();

  return (
    <NavLink
      to={`posts/${_id}`}
      className={`${styles.container} ${isLoaded ? styles.isLoaded : ''}`}>
      <img
        className={!image ? styles.noImage : ''}
        src={imageSrc(image)}
        onLoad={() => setIsLoaded(true)}
        alt={'image'}
      />
      <div className={styles.info}>
        <div className={styles.details}>
          <p>{dateConvert.date(date)}</p>
          <p>{dateConvert.time(date)}</p>
        </div>
        <h5>{title}</h5>
        <div className={styles.details}>
          <div className='d-flex align-items-center gap-1'>
            <i className='bi bi-geo-alt'></i>
            <p>{location}</p>
          </div>
        </div>
      </div>
      <h5 className={`${styles.price}`}>{currencyConvert(price)}</h5>
    </NavLink>
  );
}

export default PostRow;
