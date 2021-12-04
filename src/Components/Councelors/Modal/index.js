import styles from './modal.module.css';

const Modal = (props) => {
  if (!props.showModal) {
    return null;
  } else {
    return (
      <div className={styles.modal}>
        <h2>{props.text}</h2>
        <button onClick={() => props.delete(props.id)}>Confirm</button>
        <button onClick={() => props.closeModal()}>Cancel</button>
      </div>
    );
  }
};

export default Modal;
