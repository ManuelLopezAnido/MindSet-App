import styles from './errorMessageModal.module.css';

const ErrorMessageModal = (props) => {
  if (!props.show) {
    return null;
  }

  const closeModal = () => {
    props.setShowErrorModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Message:</h3>
        <div>{props.showErrorModalMessage}</div>
        <button onClick={closeModal}>OK</button>
      </div>
    </div>
  );
};
export default ErrorMessageModal;
