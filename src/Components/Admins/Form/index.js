import { useState } from 'react';
import styles from './form.module.css';
import Input from '../Input';
import Error from '../Error';
import Button from '../Button';
import ErrorMessage from '../ErrorMessage';
import IsLoading from '../../Shared/IsLoading/IsLoading';

const AdminsForm = () => {
  const [emailValue, setEmailValue] = useState([]);
  const [passwordValue, setPasswordValue] = useState([]);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [canSave, setCanSave] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessageText, setErrorMessageText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChangeEmailInput = (event) => {
    setEmailValue(event.target.value);
  };

  const onChangePasswordInput = (event) => {
    setPasswordValue(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const params = new URLSearchParams(window.location.search);
    const adminId = params.get('id');
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
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
      })
      .then(() => {
        window.location.replace(`/admins`);
      })
      .catch((error) => {
        setShowErrorMessage(true);
        setErrorMessageText(JSON.stringify(error.message));
      })
      .finally(() => setIsLoading(false));
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

  const closeError = () => {
    setShowErrorMessage(false);
  };

  if (isLoading) return <IsLoading />;

  return (
    <div className={styles.container}>
      <ErrorMessage show={showErrorMessage} close={closeError} text={errorMessageText} />
      <form className={styles.form} onSubmit={onSubmit}>
        <h2>Form</h2>
        <Input
          name="email"
          type="string"
          placeholder="Email"
          required
          className={styles.input}
          value={emailValue}
          onChange={onChangeEmailInput}
          onBlur={validateSave}
          onFocus={hideEmail}
        />
        <Error showError={emailError} text={'Please fill with a valid email address'} />
        <Input
          name="password"
          type="password"
          placeholder="Password"
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
