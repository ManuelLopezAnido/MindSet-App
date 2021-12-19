import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import Input from 'Components/Shared/Input';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';

const InterviewsForm = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [dateValue, setDate] = useState('');
  const [timeValue, setTime] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorModalMessage, setShowErrorModalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChangeJobTitle = (event) => {
    setJobTitle(event.target.value);
  };
  const onChangeCompanyName = (event) => {
    setCompanyName(event.target.value);
  };
  const onChangeDate = (event) => {
    setDate(event.target.value);
  };
  const onChangeTime = (event) => {
    setTime(event.target.value);
  };

  const params = new URLSearchParams(window.location.search);
  const interviewId = params.get('id');

  useEffect(() => {
    if (interviewId) {
      setIsLoading(true);
      fetch(`${process.env.REACT_APP_API}/interviews/${interviewId}`)
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then((response) => {
          setJobTitle(response.jobTitle);
          setCompanyName(response.companyName);
          setDate(response.date);
          setTime(response.time);
        })
        .catch((error) => {
          setShowErrorModal(true);
          setShowErrorModalMessage(JSON.stringify(error.message));
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const submit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    let url;

    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jobTitle: jobTitle,
        companyName: companyName,
        date: dateValue,
        time: timeValue
      })
    };

    if (interviewId === null) {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/interviews/create`;
    } else {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/interviews/update/${interviewId}`;
    }

    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return (window.location.href = `/admin/interviews`);
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
          label="Job"
          id="jobTitle"
          name="jobTitleName"
          required
          value={jobTitle}
          onChange={onChangeJobTitle}
          placeholder="Job"
        />
        <Input
          label="Company"
          id="companyName"
          name="companyName"
          required
          value={companyName}
          onChange={onChangeCompanyName}
          placeholder="Company Name"
        />
        <Input
          label="Date"
          id="date"
          name="date"
          required
          value={dateValue.substring(0, 10)}
          onChange={onChangeDate}
          placeholder="E.G. 07/12/2021"
        />
        <Input
          label="Time"
          id="time"
          name="time"
          required
          value={timeValue}
          onChange={onChangeTime}
          placeholder="Type the hour"
        />
        <button className={styles.sendFormButton} type="submit">
          SEND
        </button>
      </form>
    </div>
  );
};

export default InterviewsForm;
