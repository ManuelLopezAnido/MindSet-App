import editIcon from 'assets/images/edit-icon.png';
import styles from './editButton.module.css';

const EditButton = (props) => {
  return (
    <button className={styles.editButton} onClick={props.onClick}>
      <img src={editIcon} />
    </button>
  );
};

export default EditButton;
