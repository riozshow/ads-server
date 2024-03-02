import { useEffect, useState } from 'react';
import styles from './Modal.module.scss';
import { createPortal } from 'react-dom';

function Modal() {
  const [Component, setComponent] = useState();
  const [title, setTitle] = useState('');

  useEffect(() => {
    const closeModal = () => setComponent();
    const openModal = ({ detail }) => {
      const { Component, title } = detail;
      setComponent(Component);
      setTitle(title);
    };
    document.body.addEventListener('showModal', openModal);
    document.body.addEventListener('closeModal', closeModal);
    return () => {
      document.body.removeEventListener('showModal', openModal);
      document.body.removeEventListener('closeModal', closeModal);
    };
  }, []);

  if (!Component) return;

  return createPortal(
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.topBar}>
          <h5>{title}</h5>
          <button className='py-1 px-2 ms-auto' onClick={() => setComponent()}>
            <i className='bi bi-x-lg'></i>
          </button>
        </div>
        <div className={styles.content}>{Component}</div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
