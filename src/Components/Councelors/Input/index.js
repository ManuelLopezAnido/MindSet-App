import styles from './input.module.css';

function Input(props) {
  return (
    <input
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
      required={props.required}
      className={styles.input}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
    ></input>
  );
}

export default Input;
