import React, { useState, useEffect } from 'react';
import styles from './form.module.css';
import Input from 'Components/Shared/FormInput';
import Select from 'Components/Shared/Select';
import Checkbox from 'Components/Shared/Checkbox';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import Button from 'Components/Admin/Admins/Button';
import { getOneSession, addSession, updateSession } from 'redux/sessions/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { errorToDefault } from 'redux/sessions/actions';
import { useHistory } from 'react-router-dom';
import { Field, Form } from 'react-final-form';
import { getPostulants } from 'redux/postulants/thunks';
import { getCounselors } from 'redux/counselors/thunks';
import { selectedToDefault } from 'redux/sessions/actions';

const SessionsForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [postulantsToMap, setPostulantsToMap] = useState([]);
  const [counselorsToMap, setCounselorsToMap] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((store) => store.sessions.isLoading);
  const error = useSelector((store) => store.sessions.error);
  const errorMessage = useSelector((store) => store.sessions.errorMessage);
  const selectedSession = useSelector((store) => store.sessions.selected);
  const postulants = useSelector((store) => store.postulants.list);
  const counselors = useSelector((store) => store.counselors.list);

  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('id');

  let thisPsychologist = sessionStorage.getItem('id');

  useEffect(() => {
    dispatch(getPostulants());
    dispatch(getCounselors());
    if (sessionId) {
      dispatch(getOneSession(sessionId));
    } else {
      dispatch(selectedToDefault());
    }
  }, []);

  useEffect(() => {
    const post = postulants.map((postulant) => {
      return { value: postulant._id, toShow: postulant.firstName };
    });
    setPostulantsToMap(post);

    const couns = counselors.map((counselor) => {
      return { value: counselor._id, toShow: counselor.firstName };
    });
    setCounselorsToMap(couns);
  }, [postulants, counselors]);

  const submit = () => {
    if (sessionId) {
      dispatch(updateSession(sessionId, formValues)).then((response) => {
        if (response) {
          history.push('/psychologists/settings');
        }
      });
    } else {
      dispatch(addSession(formValues)).then((response) => {
        if (response) {
          history.push('/psychologists/settings');
        }
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = (formValues) => {
    setFormValues(formValues);
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
        showModal={error}
        closeModal={() => errorToDefault()}
        titleText="Error"
        middleText={errorMessage}
        buttonText="ok"
      />
      <h1>Form</h1>
      <Form
        onSubmit={onSubmit}
        initialValues={selectedSession}
        render={(formProps) => (
          <form className={styles.container} onSubmit={formProps.handleSubmit}>
            <Field
              initialValue={thisPsychologist}
              name="counselorId"
              label="Counselor"
              options={counselorsToMap}
              component={Select}
              disabled={true}
            />
            <Field
              name="date"
              label="Date"
              type="date"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please choose a date')}
            />
            <Field
              name="time"
              label="Time"
              type="time"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please choose a time')}
            />
            <Button
              type="submit"
              className={StyleSheet.submitButton}
              disabled={formProps.submitting || formProps.pristine}
            />
          </form>
        )}
      />
    </div>
  );
};

export default SessionsForm;
