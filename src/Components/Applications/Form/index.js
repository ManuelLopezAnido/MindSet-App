import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Modal from '../../Shared/Modal';
import ErrorModal from '../../Shared/ErrorModal';
import IsLoading from '../../Shared/IsLoading/IsLoading';
import { useSelector, useDispatch } from 'react-redux';
import {
  getOneApplication,
  addApplication,
  updateApplication
} from '../../../redux/applications/thunks';
import { useHistory } from 'react-router-dom';

const FormApplication = () => {
  const [showModal, setShowModal] = useState(false);
  const [position, setPositionName] = useState('');
  const [company, setCompany] = useState('');
  const [postulant, setPostulant] = useState('');
  const [applicationState, setAppState] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector((store) => store.applications.error);
  const isLoading = useSelector((store) => store.applications.isLoading);
  const selectedApp = useSelector((store) => store.applications.selected);
  console.log('la application is: ', selectedApp);
  console.log('store Error is: ', error);

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
      dispatch(getOneApplication(appId));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(selectedApp).length) {
      setPositionName(selectedApp.positionId);
      setCompany(selectedApp.companyId);
      setPostulant(selectedApp.postulantId);
      setAppState(selectedApp.applicationState);
    }
  }, [selectedApp]);

  useEffect(() => {
    setShowErrorModal(error);
  }, [error]);

  const submit = () => {
    console.log('submited');
    if (appId == null) {
      dispatch(
        addApplication({
          position: position,
          company: company,
          postulant: postulant,
          applicationState: applicationState
        })
      ).then((response) => {
        console.log('Response is: ', response);
        if (response) {
          history.push('/applications');
        }
      });
    } else {
      console.log('Clicked');
      dispatch(
        updateApplication(appId, {
          position: position,
          company: company,
          postulant: postulant,
          applicationState: applicationState
        })
      ).then((response) => {
        console.log('Response is: ', response);
        if (response) {
          history.push('/applications');
        }
      });
    }
  };

  const closeErrorMessage = () => {
    setShowErrorModal(false);
  };

  const closeModal = () => setShowModal(false);

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
        leftButtonText="savedd"
        rightButtonText="cancel"
      />
      <ErrorModal
        showModal={showErrorModal}
        closeModal={closeErrorMessage}
        titleText="Error"
        buttonText="ok"
      />
      <h1>Form</h1>
      <form className={styles.container} onSubmit={onSubmit}>
        <Input
          label="Position"
          id="position"
          name="positionName"
          type="string"
          required
          value={position}
          onChange={onChangePosition}
        />
        <Input
          label="Company Name"
          id="company"
          name="companyName"
          type="string"
          required
          value={company}
          onChange={onChangeCompany}
        />
        <Input
          label="Postulant"
          id="postulant"
          name="postulantName"
          type="string"
          required
          value={postulant}
          onChange={onChangePostulant}
        />
        <Input
          label="State"
          id="applicationState"
          name="applicationName"
          type="string"
          required
          value={applicationState}
          onChange={onChangeAppState}
        />
        <button className={styles.sendFormButton} type="submit">
          SEND
        </button>
      </form>
    </div>
  );
};

export default FormApplication;
