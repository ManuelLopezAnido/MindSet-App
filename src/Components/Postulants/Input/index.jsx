import styles from './input.module.css';

const Input = (props) => {
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        className={styles.input}
        type={props.type}
        id={props.id}
        value={props.value}
        required={props.required}
        onChange={(event) => props.setValue(event.target.value)}
      />
    </>
  );
};

export default Input;
