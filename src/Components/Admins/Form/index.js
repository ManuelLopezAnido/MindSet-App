import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Error from '../Error';
import Button from '../Button';
import Modal from '../../Shared/Modal';
import ErrorModal from '../../Shared/ErrorModal';
import IsLoading from '../../Shared/IsLoading/IsLoading';
import { getOneAdmin, addAdmin, updateAdmin } from '../../../redux/admins/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { errorToDefault } from '../../../redux/admins/actions';
import { useHistory } from 'react-router-dom';

const AdminsForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [emailValue, setEmailValue] = useState([]);
  const [passwordValue, setPasswordValue] = useState([]);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [canSave, setCanSave] = useState(true);

  const dispatch = useDispatch();

  const history = useHistory();

  const isLoading = useSelector((store) => store.admins.isLoading);
  const error = useSelector((store) => store.admins.error);
  const errorMessage = useSelector((store) => store.admins.errorMessage);

  const params = new URLSearchParams(window.location.search);
  const adminId = params.get('id');

  if (adminId) {
    useEffect(() => {
      console.log('entre al useEffect de form');
      dispatch(getOneAdmin(adminId)).then((selected) => {
        console.log('selected', selected);
        console.log('entre al then del orto de form');
        setEmailValue(selected.data.email ?? '-');
        setPasswordValue(selected.data.password ?? '-');
      });
    }, []);
  }

  const onChangeEmailInput = (event) => {
    setEmailValue(event.target.value);
  };

  const onChangePasswordInput = (event) => {
    setPasswordValue(event.target.value);
  };

  const submit = () => {
    if (adminId) {
      dispatch(
        updateAdmin(adminId, {
          email: emailValue,
          password: passwordValue
        })
      ).then((response) => {
        if (response) {
          history.push('/admins');
        }
      });
    } else {
      dispatch(
        addAdmin({
          email: emailValue,
          password: passwordValue
        })
      ).then((response) => {
        if (response) {
          history.push('/admins');
        }
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
        showModal={error}
        closeModal={() => errorToDefault()}
        titleText="Error"
        middleText={errorMessage}
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
