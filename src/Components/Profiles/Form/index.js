import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const ProfilesForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [showModalMessageError, setShowModalMessageError] = useState(false);
  const [showModalMessageErrorMessage, setShowModalMessageErrorMessage] = useState('');

  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const onChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const params = new URLSearchParams(window.location.search);
  const workProfileId = params.get('id');

  useEffect(() => {
    console.log(workProfileId);
    if (workProfileId) {
      fetch(`${process.env.REACT_APP_API}/workprofiles/${workProfileId}`)
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then((response) => {
          console.log(response);
          setName(response.workProfile.name);
          setDescription(response.workProfile.description);
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
        name: name,
        description: description
      })
    };

    if (workProfileId === null) {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/workprofiles/create`;
    } else {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/workprofiles/update/${workProfileId}`;
    }

    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return (window.location.href = `/profiles`);
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
          id="name"
          name="profileName"
          required
          value={name}
          onChange={onChangeName}
          placeholder="Profile"
        />
        <input
          id="description"
          name="profileDescription"
          value={description}
          onChange={onChangeDescription}
          placeholder="Profile Description"
        />
        <button className={styles.sendFormButton} type="submit">
          SEND
        </button>
      </form>
    </div>
  );
};

export default ProfilesForm;
