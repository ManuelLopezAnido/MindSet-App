import styles from './errorModal.module.css';

const ErrorModal = ({ showModal, titleText, closeModal, buttonText }) => {
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
          <span>{showModal}</span>
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={closeModal}>{buttonText.toUpperCase()}</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
