import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const FormInterviews = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [dateValue, setDate] = useState('');
  const [timeValue, setTime] = useState('');
  const [showModalMessageError, setShowModalMessageError] = useState(false);
  const [showModalMessageErrorMessage, setShowModalMessageErrorMessage] = useState('');

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
  const InterviewId = params.get('id');

  useEffect(() => {
    if (InterviewId) {
      fetch(`${process.env.REACT_APP_API}/interviews/id/${InterviewId}`)
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
          setShowModalMessageError(true);
          setShowModalMessageErrorMessage(JSON.stringify(error.message));
        });
    }
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
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

    if (InterviewId === null) {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/interviews/create`;
    } else {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/interviews/update/${InterviewId}`;
    }

    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return (window.location.href = `/interviews`);
      })
      .catch((error) => {
        setShowModalMessageErrorMessage(error.toString());
        setShowModalMessageError(true);
      });
  };

  const closeModalMessageError = () => {
    setShowModalMessageError(false);
  };

  return (
    <div>
      <ErrorMessage
        show={showModalMessageError}
        closeModalMessageError={closeModalMessageError}
        setShowModalMessageError={setShowModalMessageError}
        showModalMessageErrorMessage={showModalMessageErrorMessage}
      />
      <h1>Form</h1>
      <form className={styles.container} onSubmit={onSubmit}>
        <input
          id="jobTitle"
          name="jobTitleName"
          required
          value={jobTitle}
          onChange={onChangeJobTitle}
          placeholder="Job"
        />
        <input
          id="companyName"
          name="companyName"
          value={companyName}
          onChange={onChangeCompanyName}
          placeholder="Company Name"
        />
        <input
          id="date"
          name="date"
          value={dateValue}
          onChange={onChangeDate}
          placeholder="Type a date"
        />
        <input
          id="time"
          name="time"
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

export default FormInterviews;
