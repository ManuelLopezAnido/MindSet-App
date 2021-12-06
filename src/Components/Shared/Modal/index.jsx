import styles from './modal.module.css';

const Modal = ({
  titleText,
  closeModal,
  showModal,
  middleText,
  actionEntity,
  leftButtonText,
  rightButtonText
}) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{titleText}</h3>
          <span onClick={closeModal}>&times;</span>
        </div>
        <div className={styles.content}>
          <span>{middleText}</span>
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={() => actionEntity()}>{leftButtonText.toUpperCase()}</button>
          <button onClick={closeModal}>{rightButtonText.toUpperCase()}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
