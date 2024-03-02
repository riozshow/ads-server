import { useEffect, useState, useRef } from 'react';
import styles from './FileInput.module.scss';

function FileInput(props) {
  const [title, setTitle] = useState('');
  const [isSet, setIsSet] = useState();

  const ref = useRef();

  const handleClick = () => {
    ref.current.click();
  };

  const handleChange = (e) => {
    const fileName = e.target.value.split('\\').pop();
    if (fileName) {
      setTitle(fileName);
      setIsSet(true);
    }
  };

  useEffect(() => {
    if (props.title) {
      setTitle(props.title);
    }
  }, []);

  return (
    <div
      onChangeCapture={handleChange}
      onClick={handleClick}
      className={`${styles.container} ${isSet ? styles.set : ''}`}>
      <p>{title}</p>
      <input ref={ref} type={'file'} {...props} />
    </div>
  );
}

export default FileInput;
