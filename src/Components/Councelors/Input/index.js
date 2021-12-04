import styles from './input.module.css';

const Input = (props) => {
  return (
    <input
      title={props.tittle}
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
      required={props.required}
      className={styles.input}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      disabled={props.disabled}
    ></input>
  );
};

export default Input;
