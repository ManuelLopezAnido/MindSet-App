import React, { useState, useEffect } from 'react';
import styles from './form.module.css';
import Modal from '../../Shared/Modal';
import ErrorModal from '../../Shared/ErrorModal';

const FormSession = () => {
  const [showModal, setShowModal] = useState(false);
  const [postulantIdValue, setPostulantIdValue] = useState('');
  const [counselorIdValue, setCounselorIdValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');
  const [accomplishedValue, setAccomplishedValue] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorModalMessage, setShowErrorModalMessage] = useState('');

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
          setShowErrorModal(true);
          setShowErrorModalMessage(JSON.stringify(error.message));
        });
    }
  }, []);

  const submit = () => {
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
            throw new Error(msg);
          });
        }
        return (window.location.href = `/sessions`);
      })
      .catch((error) => {
        setShowErrorModalMessage(error.toString());
        setShowErrorModal(true);
      })
      .finally(() => setShowModal(false));
  };

  const closeErrorMessage = () => {
    setShowErrorModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  return (
    <div>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        actionEntity={submit}
        titleText="Save"
        spanObjectArray={[
          {
            span: 'are you sure you want to save this changes?'
          }
        ]}
        leftButtonText="save"
        rightButtonText="cancel"
      />
      <ErrorModal
        showModal={showErrorModal}
        closeModal={closeErrorMessage}
        titleText="Error"
        middleText={showErrorModalMessage}
        buttonText="ok"
      />
      <h1>Form</h1>
      <form className={styles.container} onSubmit={onSubmit}>
        <input
          id="postulantId"
          name="postulantId"
          required
          value={postulantIdValue}
          placeholder="Postulant ID"
          onChange={onChangePostulantIdValue}
        />
        <input
          id="counselorId"
          name="counselorId"
          required
          value={counselorIdValue}
          placeholder="Counselor ID"
          onChange={onChangeCounselorIdValue}
        />
        <input
          id="date"
          name="date"
          placeholder="Date"
          value={dateValue}
          onChange={onChangeDateValue}
        />
        <input
          id="time"
          name="time"
          placeholder="Time"
          value={timeValue}
          onChange={onChangeTimeValue}
        />
        <label>Accomplished</label>
        <input
          type="checkbox"
          name="accomplished"
          onChange={(event) => setAccomplishedValue(event.target.checked)}
          checked={accomplishedValue}
        />
        <button className={styles.sendFormButton} type="submit">
          SEND
        </button>
      </form>
    </div>
  );
};

export default FormSession;
