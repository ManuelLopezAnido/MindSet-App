import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getOneApplication, addApplication, updateApplication } from 'redux/applications/thunks';
import { useHistory } from 'react-router-dom';
import Select from 'Components/Shared/Select';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import Button from 'Components/Shared/AddButton';
import { Field, Form } from 'react-final-form';
import { validateMongoID } from 'validations';
import { selectedToDefault } from 'redux/admins/actions';
import { getPositions } from 'redux/positions/thunks';
import { getPostulants } from 'redux/postulants/thunks';
import { getClients } from 'redux/clients/thunks';

const FormApplication = () => {
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [positionsToMap, setPositionsToMap] = useState([]);
  const [clientsToMap, setClientsToMap] = useState([]);
  const [postulantsToMap, setPostulantsToMap] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector((store) => store.applications.error);
  const isLoading = useSelector((store) => store.applications.isLoading);
  const selectedApp = useSelector((store) => store.applications.selected);
  const positions = useSelector((store) => store.positions.list);
  const clients = useSelector((store) => store.clients.list);
  const postulants = useSelector((store) => store.postulants.list);

  const params = new URLSearchParams(window.location.search);
  const appId = params.get('id');

  useEffect(() => {
    dispatch(getPositions());
    dispatch(getClients());
    dispatch(getPostulants());
    if (appId) {
      dispatch(getOneApplication(appId));
    } else {
      dispatch(selectedToDefault());
    }
  }, []);

  useEffect(() => {
    const poss = positions.map((position) => {
      return { value: position._id, toShow: position.jobTitle };
    });
    setPositionsToMap(poss);

    const cli = clients.map((client) => {
      return { value: client._id, toShow: client.clientName };
    });
    setClientsToMap(cli);

    const post = postulants.map((postulant) => {
      return { value: postulant._id, toShow: postulant.firstName };
    });
    setPostulantsToMap(post);
  }, [positions, clients, postulants]);

  useEffect(() => {
    setShowErrorModal(error);
  }, [error]);

  const submit = () => {
    if (!appId) {
      dispatch(addApplication(formValues)).then((response) => {
        if (response) {
          history.push('/admin/applications');
        }
      });
    } else {
      dispatch(updateApplication(appId, formValues)).then((response) => {
        if (response) {
          history.push('/admin/applications');
        }
      });
    }
  };

  const closeErrorMessage = () => {
    setShowErrorModal(false);
  };

  const onSubmit = (formValues) => {
    const formValuesOk = {
      positionId: formValues.positionId,
      clientId: formValues.clientId,
      postulantId: formValues.postulantId,
      applicationState: formValues.applicationState
    };
    setFormValues(formValuesOk);
    setShowModal(true);
  };

  const validate = (formValues) => {
    const errors = {};
    errors.positionId = validateMongoID(formValues.positionId);
    errors.clientId = validateMongoID(formValues.clientId);
    errors.postulantId = validateMongoID(formValues.postulantId);
    return errors;
  };

  if (isLoading) return <IsLoading />;

  return (
    <div>
      <Modal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
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
        buttonText="ok"
      />
      <h1>Form</h1>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={selectedApp}
        render={(formProps) => (
          <form className={styles.container} onSubmit={formProps.handleSubmit}>
            <Field
              name="positionId"
              label="Position"
              options={positionsToMap}
              component={Select}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please choose a position')}
            />
            <Field
              name="clientId"
              label="Client name"
              options={clientsToMap}
              component={Select}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please choose a client')}
            />
            <Field
              name="postulantId"
              label="Postulant name"
              options={postulantsToMap}
              component={Select}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please choose a postulant')}
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

export default FormApplication;
