import styles from './modalClient.module.css';

const ModalClient = (props) => {
  if (!props.show){
    return null;
  }

  return(
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Do you want to delete?</h3>
        <button onClick={props.closeModal}>CANCEL</button>
        <button onClick={()=> props.deleteClient(props.selectedId)}>CONFIRM</button>
      </div>
    </div>
  );
};
export default ModalClient;