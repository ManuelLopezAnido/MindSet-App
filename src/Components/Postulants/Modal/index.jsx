import styles from './modal.module.css';

const Modal = (props) => {
  if (!props.showModal) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>modal</h3>
        <button onClick={props.closeModal}>
          Are you sure you want to delete {props.firstName} {props.lastName}
        </button>
      </div>
    </div>
  );
};

export default Modal;
