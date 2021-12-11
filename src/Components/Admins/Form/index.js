import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Error from '../Error';
import Button from '../Button';
import Modal from '../../Shared/Modal';
import ErrorModal from '../../Shared/ErrorModal';
import IsLoading from '../../Shared/IsLoading/IsLoading';

const AdminsForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [emailValue, setEmailValue] = useState([]);
  const [passwordValue, setPasswordValue] = useState([]);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [canSave, setCanSave] = useState(true);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorModalMessage, setShowErrorModalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const adminId = params.get('id');

  if (adminId) {
    useEffect(() => {
      fetch(`${process.env.REACT_APP_API}/admins/${adminId}`)
        .then((response) => response.json())
        .then((response) => {
          onLoading(response);
        })
        .catch((error) => error);
    }, []);
  }

  const onLoading = (data) => {
    setEmailValue(data.data.email ?? '-');
    setPasswordValue(data.data.password ?? '-');
  };

  const onChangeEmailInput = (event) => {
    setEmailValue(event.target.value);
  };

  const onChangePasswordInput = (event) => {
    setPasswordValue(event.target.value);
  };

  const submit = () => {
    setIsLoading(true);
    let url;

    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue
      })
    };

    if (adminId !== null) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/admins/update/${adminId}`;
    } else {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/admins/create`;
    }

    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && !canSave) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
      })
      .then(() => {
        window.location.replace(`/admins`);
      })
      .catch((error) => {
        setShowErrorModal(true);
        setShowErrorModalMessage(JSON.stringify(error.message));
      })
      .finally(() => {
        setShowModal(false);
        setIsLoading(false);
      });
  };

  const closeModal = () => setShowModal(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const hideEmail = () => {
    setEmailError(false);
  };

  const hidePassword = () => {
    setPasswordError(false);
  };

  const validateSave = () => {
    if (emailValue.length > 0 && passwordValue.length === 0) {
      if (!emailValue.includes('@')) {
        setEmailError(true);
        setCanSave(true);
      }
    } else if (emailValue.length === 0 && passwordValue.length > 0) {
      if (passwordValue.length < 8) {
        setPasswordError(true);
        setCanSave(true);
      }
    } else if (emailValue.length === 0 && passwordValue.length === 0) {
      setCanSave(true);
    } else if (emailValue.length > 0 && passwordValue.length > 0) {
      if (passwordValue.length < 8) {
        setPasswordError(true);
        setCanSave(true);
      } else if (!emailValue.includes('@')) {
        setEmailError(true);
        setCanSave(true);
      } else if (!emailError && !passwordError) {
        setCanSave(false);
      }
    }
  };

  const closeErrorMessage = () => {
    setShowErrorModal(false);
  };

  if (isLoading) return <IsLoading />;

  return (
    <div className={styles.container}>
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
      <form className={styles.form} onSubmit={onSubmit}>
        <h2>Form</h2>
        <Input
          label="Email"
          name="email"
          type="string"
          required
          className={styles.input}
          value={emailValue}
          onChange={onChangeEmailInput}
          onBlur={validateSave}
          onFocus={hideEmail}
        />
        <Error showError={emailError} text={'Please fill with a valid email address'} />
        <Input
          label="Password"
          name="password"
          type="password"
          required
          className={styles.input}
          value={passwordValue}
          onChange={onChangePasswordInput}
          onBlur={validateSave}
          onFocus={hidePassword}
        />
        <Error
          showError={passwordError}
          text={'Password is too short. It must have at least 8 characters.'}
        />
        <Button type="Submit" disabled={canSave} />
      </form>
    </div>
  );
};

export default AdminsForm;
