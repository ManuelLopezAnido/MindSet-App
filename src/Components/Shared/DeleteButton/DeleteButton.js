import deleteIcon from 'assets/images/delete-icon.png';
import styles from './deleteButton.module.css';

const DeleteButton = (props) => {
  return (
    <button className={styles.deleteButton} onClick={props.onClick}>
      <img src={deleteIcon} />
    </button>
  );
};

export default DeleteButton;
