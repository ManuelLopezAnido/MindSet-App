import styles from './input.module.css';

const Input = ({
  label,
  id,
  name,
  type,
  required,
  value,
  pattern,
  onChange,
  onBlur,
  onFocus,
  checked
}) => {
  return (
    <div className={styles.input}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        pattern={pattern}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        checked={checked}
      ></input>
    </div>
  );
};

export default Input;
