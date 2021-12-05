import styles from './errorMessage.module.css';

const ErrorMessage = (props) => {
  if (!props.show) {
    return null;
  }

  const closeModal = () => {
    props.setShowModalMessageError(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Message:</h3>
        <div>{props.showModalMessageErrorMessage}</div>
        <button onClick={closeModal}>OK</button>
      </div>
    </div>
  );
};
export default ErrorMessage;
