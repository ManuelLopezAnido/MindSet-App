import styles from './modalInfo.module.css';

const ModalInfo = ({ showModal, job, date, company, time, closeModal }) => {
  if (!showModal) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Review your Interview</h3>
        <button onClick={closeModal}>X</button>
      </div>
      <div className={styles.body}>
        <h4>Job Title</h4>
        <p>{job}</p>
        <h4>Company</h4>
        <p>{company}</p>
        <h4>Date</h4>
        <p>{date}</p>
        <h4>Hour</h4>
        <p>{time}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={closeModal}>OK</button>
      </div>
    </div>
  );
};

export default ModalInfo;
