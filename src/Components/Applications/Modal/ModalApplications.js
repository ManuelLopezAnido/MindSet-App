import styles from './modalApplications.module.css';

const ModalApplications = (props) => {

  if (!props.show){
    return null;
  }

  return(
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Do you want to delete?</h3>
        <div>
          <button onClick={()=> props.delete(props.selectedId)}>CONFIRM</button>
          <button onClick={props.closeModal}>CANCEL</button>
        </div>
      </div>
    </div>
  );
};
export default ModalApplications;