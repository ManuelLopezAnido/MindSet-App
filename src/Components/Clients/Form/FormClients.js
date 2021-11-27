import React, { useState } from 'react';
import styles from './form.module.css';

const FormClient = () => {
  const [companyNameValue, setCompanyNameValue] = useState('');
  const [companyTypeValue, setCompanyTypeValue] = useState('');

  const onChangeCompanyNameValue = (event) => {
    setCompanyNameValue(event.target.value);
  };

  const onChangeCompanyType = (event) => {

  };

  return (
    <div>
      <h1>Form</h1>
      <form className={styles.container}>
        <input id="companyName" name="companyName" required value={companyNameValue} onChange={onChangeCompanyNameValue}></input>
        <input id="companyType" name="companyType" required onChange={onChangeCompanyType}></input>
        <input id="city" name="city"></input>
        <input id="country" name="country"></input>
        <input id="email" name="email" required></input>
        <input id="phone" name="phone" required></input>
        <input id="openPositions" name="openPositions"></input>
        <button type="submit">SEND</button>
      </form>
    </div>
  );
};

export default FormClient;
