import styles from './modal.module.css';

const Modal = ({
  titleText,
  closeModal,
  showModal,
  actionEntity,
  leftButtonText,
  rightButtonText,
  spanObjectArray
}) => {
  if (!showModal) {
    return null;
  }
  console.log(spanObjectArray);
  //TODO: change styles after reset
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{titleText}</h3>
          <span onClick={closeModal}>&times;</span>
        </div>
        <div className={styles.content}>
          {spanObjectArray.map((span) => (
            <>
              {span.title ? <h4 key={span.span + 1}>{span?.title}</h4> : null}
              <span key={span.span}>{span?.span}</span>
            </>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={() => actionEntity()}>{leftButtonText.toUpperCase()}</button>
          <button onClick={closeModal}>{rightButtonText.toUpperCase()}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
