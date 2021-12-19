import styles from './button.module.css';

function Button(props) {
  return (
    <button disabled={props.disabled} type={props.type} className={styles.button}>
      Save
    </button>
  );
}

export default Button;
