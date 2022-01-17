import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import Input from 'Components/Shared/FormInput';
import Modal from 'Components/Shared/Modal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import Button from 'Components/Shared/Button/Button';
import Select from 'Components/Shared/Select';
import { useHistory } from 'react-router-dom';
import { Field, Form } from 'react-final-form';
import { useSelector, useDispatch } from 'react-redux';
import { errorToDefault, selectedToDefault } from 'redux/admins/actions';
import { getOneInterview, addInterview, updateInterview } from 'redux/interviews/thunks';
import { getPostulants } from 'redux/postulants/thunks';
import { getClients } from 'redux/clients/thunks';

const InterviewsForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [clientsToMap, setClientsToMap] = useState([]);
  const [postulantsToMap, setPostulantsToMap] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((store) => store.interviews.isLoading);
  const error = useSelector((store) => store.interviews.error);
  const selectedInterview = useSelector((store) => store.interviews.selected);
  const clients = useSelector((store) => store.clients.list);
  const postulants = useSelector((store) => store.postulants.list);

  const params = new URLSearchParams(window.location.search);
  const interviewId = params.get('id');

  useEffect(() => {
    dispatch(getClients());
    dispatch(getPostulants());
    if (interviewId) {
      dispatch(getOneInterview(interviewId));
    } else {
      dispatch(selectedToDefault());
    }
  }, []);

  //setting up selects
  useEffect(() => {
    const cli = clients.map((client) => {
      return { value: client._id, toShow: client.clientName };
    });
    setClientsToMap(cli);

    const post = postulants.map((postulant) => {
      return { value: postulant._id, toShow: postulant.firstName };
    });
    setPostulantsToMap(post);
  }, [clients, postulants]);

  const submit = () => {
    if (interviewId) {
      dispatch(updateInterview(interviewId, formValues)).then((response) => {
        if (response) {
          history.push('/admin/interviews');
        }
      });
    } else {
      dispatch(addInterview(formValues)).then((response) => {
        if (response) {
          history.push('/admin/interviews');
        }
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = (formValues) => {
    const formValuesOk = {
      jobTitle: formValues.jobTitle,
      postulantId: formValues.postulantId,
      clientId: formValues.clientId,
      date: formValues.date,
      time: formValues.time,
      state: formValues.state
    };
    setFormValues(formValuesOk);
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
      <Modal
        showModal={!!error}
        closeModal={() => errorToDefault()}
        actionEntity={submit}
        titleText="Save"
        spanObjectArray={[
          {
            span: error
          }
        ]}
        leftButtonText="OK"
        rightButtonText="CLOSE"
      />
      <h1>Form</h1>

      <Form
        onSubmit={onSubmit}
        initialValues={selectedInterview}
        render={(formProps) => (
          <form className={styles.form} onSubmit={formProps.handleSubmit}>
            <h2>Form</h2>
            <Field
              name="jobTitle"
              label="jobTitle"
              placeholder="Electrical engineer"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please state the job  offer')}
            />
            <Field
              name="clientId"
              label="Client"
              placeholder="Coca-cola"
              options={clientsToMap}
              component={Select}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please select a client')}
            />
            <Field
              name="postulantId"
              label="Postulant"
              placeholder="Jorge"
              options={postulantsToMap}
              component={Select}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please select a postulant')}
            />
            <Field
              name="date"
              label="Date"
              type="date"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please select a date')}
            />
            <Field
              name="time"
              label="Time"
              type="time"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please select a time')}
            />
            <Field
              name="state"
              label="State"
              options={[
                { value: 'FULFILLED', toShow: 'FULFILLED' },
                { value: 'PENDING', toShow: 'PENDING' },
                { value: 'REJECTED', toShow: 'REJECTED' },
                { value: 'HIRED', toShow: 'HIRED' }
              ]}
              component={Select}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please select a time')}
            />
            <Button
              type="submit"
              className={styles.submitButton}
              disabled={formProps.submitting || formProps.pristine}
            />
          </form>
        )}
      />
    </div>
  );
};

export default InterviewsForm;
