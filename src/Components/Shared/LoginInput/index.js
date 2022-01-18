import styles from './loginInput.module.css';

const Input = (props) => {
  const hasError = !!(props.meta.touched && props.meta.error);
  return (
    <div className={styles.container}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        className={`${styles.input} ${props.style} ${hasError && styles.inputError}`}
        placeholder={props.placeholder}
        disabled={props.disabled}
        {...props.input}
      />
      <div className={styles.errorMessage}>{props.meta.touched && props.meta.error}</div>
    </div>
  );
};

export default Input;
