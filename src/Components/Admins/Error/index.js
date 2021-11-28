import styles from './error.module.css';

function Error(props) {
  if (!props.showError) {
    return null;
  } else {
    return (
      <div className={styles.error}>
        <p>{props.text}</p>
      </div>
    );
  }
}

export default Error;
