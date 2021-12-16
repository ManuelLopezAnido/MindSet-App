import React, { useState, useEffect } from 'react';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Modal from '../../Shared/Modal';
import ErrorModal from '../../Shared/ErrorModal';
import IsLoading from '../../Shared/IsLoading/IsLoading';

const SessionsForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [postulantIdValue, setPostulantIdValue] = useState('');
  const [counselorIdValue, setCounselorIdValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');
  const [accomplishedValue, setAccomplishedValue] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorModalMessage, setShowErrorModalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
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
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const submit = () => {
    setIsLoading(true);
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
      .finally(() => {
        setShowModal(false);
        setIsLoading(false);
      });
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

  if (isLoading) return <IsLoading />;

  return (
    <div>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        actionEntity={submit}
        titleText="Save"
        spanObjectArray={[
          {
            span: 'Are you sure you want to save these changes?'
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

export default SessionsForm;
