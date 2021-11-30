import styles from './input.module.css';

const Input = (props) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        required={props.required}
        onChange={(event) => props.setValue(event.target.value)}
      />
    </div>
  );
};

export default Input;
