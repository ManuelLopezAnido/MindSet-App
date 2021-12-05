import styles from './modalInterviews.module.css';

const ModalInterviews = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Do you want to delete?</h3>
        <div>
          <button onClick={() => props.deleteInterview(props.selectedId)}>CONFIRM</button>
          <button onClick={props.closeModal}>CANCEL</button>
        </div>
      </div>
    </div>
  );
};
export default ModalInterviews;
