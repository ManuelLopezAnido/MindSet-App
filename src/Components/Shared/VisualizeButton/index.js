import visualizeIcon from 'assets/images/visualize.png';
import styles from './visualizeButton.module.css';

const VisualizeButton = (props) => {
  return (
    <button className={styles.visualizeButton} onClick={props.onClick}>
      <img src={visualizeIcon} />
    </button>
  );
};

export default VisualizeButton;
