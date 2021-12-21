import styles from './select.module.css';

const Select = (props) => {
  const hasError = !!(props.meta.touched && props.meta.error);

  return (
    <div className={styles.container}>
      {props.label && <label>{props.label}</label>}
      <select
        name={props.name}
        className={`${styles.select} ${props.style} ${hasError && styles.selectError}`}
        placeholder={props.placeholder}
        disabled={props.disabled}
        {...props.select}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.toShow}
          </option>
        ))}
        <div className={styles.errorMessage}>{props.meta.touched && props.meta.error}</div>
      </select>
    </div>
  );
};

export default Select;
