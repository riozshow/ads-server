import styles from './Placeholder.module.scss';
import { imageSrc } from '../../../utils/imgSrc';

function Placeholder() {
  return (
    <div className={styles.container}>
      <img
        style={{ filter: 'invert(1)', height: '60px' }}
        src={imageSrc('empty.png')}
      />
      <h5>Empty</h5>
    </div>
  );
}

export default Placeholder;
