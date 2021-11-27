import React, { useState } from 'react';
import styles from './form.module.css';

const FormClient = () => {
  const [companyNameValue, setCompanyNameValue] = useState('');
  const [companyTypeValue, setCompanyTypeValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [openPositionsValue, setOpenPositionsValue] = useState([]);

  const params = new URLSearchParams(window.location.search);
  const clientId = params.get('id');

  const onChangeCompanyNameValue = (event) => {
    setCompanyNameValue(event.target.value);
  };
  const onChangeCompanyType = (event) => {
    setCompanyTypeValue(event.target.value);
  };
  const onChangeCity = (event) => {
    setCityValue(event.target.value);
  };
  const onChangeCountry = (event) => {
    setCountryValue(event.target.value);
  };
  const onChangeEmail = (event) => {
    setEmailValue(event.target.value);
  };
  const onChangePhone = (event) => {
    setPhoneValue(event.target.value);
  };
  const onChangeOpenPositions = (event) => {
    setOpenPositionsValue(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        companyName: companyNameValue,
        companyType: companyTypeValue,
        city: cityValue,
        country:countryValue ,
        email: emailValue,
        phone: phoneValue,
        openPositions: openPositionsValue,
      })
    };

    const clientId = params.get('id');
    const url = `${process.env.REACT_APP_API}/api/clients/add?id=${clientId}`;

    fetch(url, option).then((response) => {
      if (response.status !== 200 && response.status !== 201){
        return response.json().then(({message}) => {
          throw new Error(message);
        });
      }
      return response.json();
    });
  };

  return (
    <div>
      <h1>Form</h1>
      <form className={styles.container} onSubmit={onSubmit}>
        <input id="companyName" name="companyName" required value={companyNameValue} onChange={onChangeCompanyNameValue} placeholder="Company Name"></input>
        <input id="companyType" name="companyType" required value={companyTypeValue} onChange={onChangeCompanyType} placeholder="Company Type"></input>
        <input id="city" name="city" value={cityValue} onChange={onChangeCity} placeholder="City"></input>
        <input id="country" name="country" value={countryValue} onChange={onChangeCountry} placeholder="Country"></input>
        <input id="email" name="email" required value={emailValue} onChange={onChangeEmail} placeholder="Email"></input>
        <input id="phone" name="phone" required value={phoneValue} onChange={onChangePhone} placeholder="Phone"></input>
        <input id="openPositions" name="openPositions" value={openPositionsValue} onChange={onChangeOpenPositions} placeholder="Open Positions"></input>
        <button type="submit">SEND</button>
      </form>
    </div>
  );
};

export default FormClient;
