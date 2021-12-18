import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import Input from 'Components/Shared/Input';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';

const ProfilesForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorModalMessage, setShowErrorModalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const onChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const params = new URLSearchParams(window.location.search);
  const workProfileId = params.get('id');

  useEffect(() => {
    if (workProfileId) {
      setIsLoading(true);
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
          setName(response.workProfile.name);
          setDescription(response.workProfile.description);
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
        setShowErrorModalMessage(error.toString());
        setShowErrorModal(true);
      })
      .finally(() => {
        setShowModal(false);
        setIsLoading(false);
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeErrorMessage = () => {
    setShowErrorModal(false);
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
          label="Profile name"
          id="name"
          name="profileName"
          required
          value={name}
          onChange={onChangeName}
          placeholder="Profile"
        />
        <Input
          label="Profile description"
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
