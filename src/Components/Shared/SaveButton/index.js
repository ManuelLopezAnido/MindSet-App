import styles from './saveButton.module.css';

const SaveButton = (props) => {
  return (
    <button disabled={props.disabled} type={props.type} className={styles.button}>
      Save
    </button>
  );
};

export default SaveButton;
