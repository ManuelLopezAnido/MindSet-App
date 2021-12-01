import React, { useState, useEffect } from 'react';
import styles from './form.module.css';

const FormSession = () => {
  const [postulantIdValue, setPostulantIdValue] = useState('');
  const [counselorIdValue, setCounselorIdValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');
  const [accomplishedValue, setAccomplishedValue] = useState(false);

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

  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('id');

  useEffect(()=> {
    if(sessionId){
      fetch(`${process.env.REACT_APP_API}/api/sessions/${sessionId}`)
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then((response) => {
          setPostulantIdValue(response.data.postulantId);
          setCounselorIdValue(response.data.counselorId);
          setDateValue(response.data.date);
          setTimeValue(response.data.time);
          setAccomplishedValue(response.data.accomplished);
        });
    }
  }, []);

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

    if (sessionId === null) {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/api/sessions`;
      window.location.href = `/sessions`;
    } else {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/api/sessions/${sessionId}`;
      window.location.href = `/sessions`;
    }

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
    console.log(options.body);
  };

  return (
    <div>
      <h1>Form</h1>
      <form className={styles.container} onSubmit={onSubmit}>
        <input id="postulantId" name="postulantId" required value={postulantIdValue} placeholder="Postulant ID" onChange={onChangePostulantIdValue}></input>
        <input id="counselorId" name="counselorId" required value={counselorIdValue} placeholder="Counselor ID" onChange={onChangeCounselorIdValue}></input>
        <input id="date" name="date" placeholder="Date" value={dateValue} onChange={onChangeDateValue}></input>
        <input id="time" name="time" placeholder="Time" value={timeValue} onChange={onChangeTimeValue}></input>
        <label>Accomplished</label>
        <input type="checkbox" name="accomplished" onChange={(event) => setAccomplishedValue(event.target.checked)} checked={accomplishedValue}></input>
        <button className={styles.sendFormButton} type="submit">SEND</button>
      </form>
    </div>
  );
};

export default FormSession;