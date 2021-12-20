import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getOneApplication, addApplication, updateApplication } from 'redux/applications/thunks';
import { useHistory } from 'react-router-dom';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import Button from 'Components/Shared/Button/Button';
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

  // useEffect(() => {
  //   dispatch(getPositions()).then(() => {
  //     const poss = positions.map((position) => {
  //       return { value: position._id, toShow: position.jobTitle };
  //     });
  //     setPositionsToMap(poss);
  //   });
  //   dispatch(getClients()).then(() => {
  //     const cli = clients.map((client) => {
  //       return { value: client._id, toShow: client?.companyName };
  //     });
  //     setClientsToMap(cli);
  //   });
  //   dispatch(getPostulants()).then(() => {
  //     console.log('postulants store', postulants);
  //     const post = postulants.map((postulant) => {
  //       return { value: postulant?._id, toShow: postulant?.firstName };
  //     });
  //     setPostulantsToMap(post);
  //   });
  //   if (appId) {
  //     dispatch(getOneApplication(appId));
  //   } else {
  //     dispatch(selectedToDefault());
  //   }
  // }, []);

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
      return { value: client._id, toShow: client.companyName };
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
    console.log('entre a submit');
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
    console.log('entre a onSubmit');
    setFormValues(formValues);
    setShowModal(true);
  };

  const validate = (formValues) => {
    console.log('formValues: ', formValues);
    const errors = {};
    errors.positionId = validateMongoID(formValues.positionId);
    errors.companyId = validateMongoID(formValues.companyId);
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
              placeholder="some position ID for Now"
              options={positionsToMap}
              component={Select}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please choose a position')}
            />
            <Field
              name="companyId"
              label="Company name"
              placeholder="some company ID form now"
              options={clientsToMap}
              component={Select}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please choose a company')}
            />
            <Field
              name="postulantId"
              label="Postulant name"
              placeholder="some postulant ID form now"
              options={postulantsToMap}
              component={Select}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please choose a postulant')}
            />
            <Field
              name="state"
              label="State"
              placeholder="completed"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please choose a state')}
            />
            <Button
              type="submit"
              onClick={() => console.log('clicked')}
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
