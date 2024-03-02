import styles from './Spinner.module.scss';

function Spinner() {
  return (
    <div className={styles.container}>
      <div className={styles.loader} role='status'></div>
    </div>
  );
}

export default Spinner;
