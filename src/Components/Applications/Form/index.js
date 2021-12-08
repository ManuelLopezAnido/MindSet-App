import React, { useEffect, useState } from 'react';
import styles from './form.module.css';

const ApplicationForm = () => {
  const [position, setPositionName] = useState('');
  const [company, setCompany] = useState('');
  const [postulant, setPostulant] = useState('');
  const [applicationState, setAppState] = useState('');

  const onChangePosition = (event) => {
    setPositionName(event.target.value);
  };
  const onChangeCompany = (event) => {
    setCompany(event.target.value);
  };
  const onChangePostulant = (event) => {
    setPostulant(event.target.value);
  };
  const onChangeAppState = (event) => {
    setAppState(event.target.value);
  };

  const params = new URLSearchParams(window.location.search);
  const appId = params.get('id');

  useEffect(() => {
    if (appId) {
      fetch(`${process.env.REACT_APP_API}/applications/id/${appId}`)
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ ErrMessage }) => {
              throw new Error(ErrMessage);
            });
          }
          return response.json();
        })
        .then((response) => {
          setPositionName(response.positionId);
          setCompany(response.companyId);
          setPostulant(response.postulantId ? response.postulantId : 'No id'); // Bad DB. Applications with no postulantID exist
          setAppState(response.applicationState);
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
        positionId: position,
        companyId: company,
        postulantId: postulant,
        applicationState: applicationState
      })
    };

    if (appId === null) {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/applications/add`;
    } else {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/applications/update/${appId}`;
    }
    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ ErrMessage }) => {
            throw new Error(ErrMessage);
          });
        }
        window.location.href = `/applications`;
      })
      .catch((error) => {
        return error;
      });
  };
  return (
    <div>
      <h1>Form</h1>
      <form className={styles.container} onSubmit={onSubmit}>
        <input
          id="position"
          name="positionName"
          required
          value={position}
          onChange={onChangePosition}
          placeholder="Position"
        ></input>
        <input
          id="company"
          name="companyName"
          required
          value={company}
          onChange={onChangeCompany}
          placeholder="Company Name"
        ></input>
        <input
          id="postulant"
          name="postulantName"
          value={postulant}
          onChange={onChangePostulant}
          placeholder="Postulant Name"
        ></input>
        <input
          id="applicationState"
          name="applicationName"
          value={applicationState}
          onChange={onChangeAppState}
          placeholder="State"
        ></input>
        <button className={styles.sendFormButton} type="submit">
          SEND
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;