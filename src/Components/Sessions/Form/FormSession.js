import React, { useState, useEffect } from 'react';
import styles from './form.module.css';
import ErrorMessageModal from '../ErrorMessageModal/ErrorMessageModal';
import Input from '../../Shared/Input';

const FormSession = () => {
  const [postulantIdValue, setPostulantIdValue] = useState('');
  const [counselorIdValue, setCounselorIdValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');
  const [accomplishedValue, setAccomplishedValue] = useState(false);
  const [showModalMessageError, setShowModalMessageError] = useState(false);
  const [showModalMessageErrorMessage, setShowModalMessageErrorMessage] = useState('');

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

  useEffect(() => {
    if (sessionId) {
      fetch(`${process.env.REACT_APP_API}/sessions/${sessionId}`)
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
        })
        .catch((error) => {
          setShowModalMessageError(true);
          setShowModalMessageErrorMessage(JSON.stringify(error.message));
        });
    }
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    let url = `${process.env.REACT_APP_API}/sessions`;

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
        accomplished: accomplishedValue
      })
    };

    if (sessionId === null) {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/sessions`;
    } else {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/sessions/${sessionId}`;
    }

    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ msg }) => {
            console.log('message: ', msg);
            throw new Error(msg);
          });
        }
        return (window.location.href = `/sessions`);
      })
      .catch((error) => {
        console.log('error: ', error);
        setShowModalMessageErrorMessage(error.toString());
        setShowModalMessageError(true);
      });
  };

  const closeModalMessageError = () => {
    setShowModalMessageError(false);
  };

  return (
    <div>
      <ErrorMessageModal
        show={showModalMessageError}
        closeModalMessageError={closeModalMessageError}
        setShowModalMessageError={setShowModalMessageError}
        showModalMessageErrorMessage={showModalMessageErrorMessage}
      />
      <h1>Form</h1>
      <form className={styles.container} onSubmit={onSubmit}>
        <Input
          label="Postulant Id"
          id="postulantId"
          name="postulantId"
          type="string"
          required
          value={postulantIdValue}
          onChange={onChangePostulantIdValue}
        />
        <Input
          label="Counselor Id"
          id="counselorId"
          name="counselorId"
          type="string"
          required
          value={counselorIdValue}
          onChange={onChangeCounselorIdValue}
        />
        <Input
          label="Date"
          id="date"
          name="date"
          required
          value={dateValue}
          onChange={onChangeDateValue}
        />
        <Input
          label="Time"
          id="time"
          name="time"
          required
          value={timeValue}
          onChange={onChangeTimeValue}
        />
        <label>Accomplished</label>
        <Input
          type="checkbox"
          name="accomplished"
          onChange={(event) => setAccomplishedValue(event.target.checked)}
          checked={accomplishedValue}
          required
        />
        <button className={styles.sendFormButton} type="submit">
          SEND
        </button>
      </form>
    </div>
  );
};

export default FormSession;
