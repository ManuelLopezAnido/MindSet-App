import styles from './modalInfo.module.css';

const ModalInfo = (props) => {
  if (!props.showModal) {
    return null;
  }
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3>Review your Interview</h3>
          <button onClick={props.closeModal}>X</button>
        </div>
        <div className={styles.body}>
          <h4>{props.title1}</h4>
          <p>{props.text1}</p>
          <h4>{props.title2}</h4>
          <p>{props.text2}</p>
          <h4>{props.title3}</h4>
          <p>{props.text3}</p>
          <h4>{props.title4}</h4>
          <p>{props.text4}</p>
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={props.closeModal}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default ModalInfo;
