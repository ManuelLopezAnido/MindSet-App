import styles from './modal.module.css';

const Modal = (props) => {
  if (!props.showModal) {
    return null;
  }

  const deletePostulant = (id) => {
    props.actionPostulant(id);
    props.closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>{props.titleText}</h3>
        <p>{props.warningText}</p>
        <p>
          {props.text} {props.firstName} {props.lastName}
        </p>
        <div className={styles.buttonContainer}>
          <button onClick={deletePostulant}>{props.buttonText}</button>
          <button onClick={() => props.closeModal()}>close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
