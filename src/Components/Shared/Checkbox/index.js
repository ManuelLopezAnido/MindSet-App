import React from 'react';
import styles from './checkbox.module.css';

const Checkbox = ({ label, selected, onChange, id }) => {
  return (
    <div className={styles.container}>
      <input
        className={`${styles.checkbox}`}
        id={id}
        type="checkbox"
        value={selected}
        defaultChecked={selected}
        onChange={onChange}
      />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
