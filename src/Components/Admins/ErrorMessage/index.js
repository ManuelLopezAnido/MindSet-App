import styles from './error.message.module.css';

const ErrorMessage = (props) => {
  if (!props.show) {
    return null;
  } else {
    return (
      <div className={styles.error}>
        <h2>Error</h2>
        <div>{props.text}</div>
        <button onClick={() => props.close()}>Close</button>
      </div>
    );
  }
};

export default ErrorMessage;
