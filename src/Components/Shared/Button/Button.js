import styles from './button.module.css';

const Button = (props) => {
  return (
    <button className={styles.addButton} onClick={props.onClick}>
      Add a new {props.value}
    </button>
  );
};

export default Button;
