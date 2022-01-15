import styles from './addButton.module.css';

const AddButton = (props) => {
  return (
    <div className={styles.button}>
      <button onClick={props.onClick}> + </button>
      <p>Add a new {props.value} </p>
    </div>
  );
};

export default AddButton;
