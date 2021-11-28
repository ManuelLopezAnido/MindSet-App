import React, { useState } from 'react';
import styles from './form.module.css';

const FormSession = () => {

  const [postulantIdValue, setPostulantIdValue] = useState('');
  const [counselorIdValue, setCounselorIdValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');
  const [accomplishedValue, setAccomplishedValue] = useState('');

  const onChangePostulantIdValue = (event) => {
    setPostulantIdValue(event.target.value);
  };

  const onChangeCounselorIdValue = (event) => {
    setCounselorIdValue(event.target.value);
  };

  const onChangeDateValue = (event) => {
    setDateValue(event.target.value);
  };

  const onChangeTimeValue = (event) => {
    setTimeValue(event.target.value);
  };

  const onChangeAccomplishedValue = (event) => {
    setAccomplishedValue(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    let url = `${process.env.REACT_APP_API}/api/sessions`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        postulantId: postulantIdValue,
        counselorId: counselorIdValue,
        date: dateValue,
        time: timeValue,
        accomplished: accomplishedValue,
      })
    };

    fetch(url, options).then((response) => {
      if (response.status !== 200 && response.status !== 201){
        return response.json().then(({message}) => {
          throw new Error(message);
        });
      }
      return response.json();
    })
    .catch((error) => {
      return error;
    });
    window.location.href = `/sessions`;
  };

  return (
    <div>
      <h1>Form</h1>
      <form className={styles.container} onSubmit={onSubmit}>
        <input id="postulantId" name="postulantId" required placeholder="Postulant ID" onChange={onChangePostulantIdValue}></input>
        <input id="counselorId" name="counselorId" required placeholder="Counselor ID" onChange={onChangeCounselorIdValue}></input>
        <input id="date" name="date" placeholder="Date" onChange={onChangeDateValue}></input>
        <input id="time" name="time" placeholder="Time" onChange={onChangeTimeValue}></input>
        <input id="accomplished" name="accomplished" required placeholder="Accomplished" onChange={onChangeAccomplishedValue}></input>
        <button className={styles.sendFormButton} type="submit">SEND</button>
      </form>
    </div>
  );
};

export default FormSession;