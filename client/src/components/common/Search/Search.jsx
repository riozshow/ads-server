import styles from './Search.module.scss';

function Search({ onChange, value = '' }) {
  return (
    <input
      type='text'
      className={styles.container}
      placeholder='Search...'
      aria-label=''
      aria-describedby='basic-addon1'
      onChange={onChange}
      value={value}
    />
  );
}

export default Search;
