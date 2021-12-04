import styles from './modal.module.css';

const Modal = (props) => {
  if (!props.showModal) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{props.titleText}</h3>
          <span onClick={props.closeModal}>&times;</span>
        </div>
        <div className={styles.content}>
          <span>{props.middleText}</span>
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={() => props.actionEntity()}>{props.leftButtonText.toUpperCase()}</button>
          <button onClick={props.closeModal}>{props.rightButtonText.toUpperCase()}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
