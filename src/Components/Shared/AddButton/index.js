import styles from './addButton.module.css';

const AddButton = (props) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      +
    </button>
  );
};

export default AddButton;
