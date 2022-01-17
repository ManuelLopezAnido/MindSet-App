import styles from './modal.module.css';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{titleText}</h3>
          <span onClick={closeModal}>&times;</span>
        </div>
        <div className={styles.content}>
          {spanObjectArray.map((span) => (
            <div key={span.span + 2}>
              {span.title ? <h4 key={span.span + 1}>{span?.title}</h4> : null}
              <span key={span.span}>{span?.span}</span>
            </div>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          {leftButtonText ? (
            <button onClick={actionEntity}>{leftButtonText.toUpperCase()}</button>
          ) : null}
          <button
            onClick={() => {
              console.log('spanObjectArray[0].span', spanObjectArray[0].span);
              if (spanObjectArray[0].span === 'No User Privileges') {
                history.goBack();
              } else {
                actionEntity;
              }
            }}
          >
            {rightButtonText.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
