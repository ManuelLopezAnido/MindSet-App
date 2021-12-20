import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getOneApplication, addApplication, updateApplication } from 'redux/applications/thunks';
import { useHistory } from 'react-router-dom';
import Input from 'Components/Shared/Input';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import { Field, Form } from 'react-final-form';
import { validateMongoID } from 'validations';
import { selectedToDefault } from 'redux/admins/actions';

const FormApplication = () => {
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formValues, setFormValues] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector((store) => store.applications.error);
  const isLoading = useSelector((store) => store.applications.isLoading);
  const selectedApp = useSelector((store) => store.applications.selected);

  const params = new URLSearchParams(window.location.search);
  const appId = params.get('id');

  if (appId) {
    useEffect(() => {
      dispatch(getOneApplication(appId));
    }, []);
  } else {
    useEffect(() => {
      dispatch(selectedToDefault());
    }, []);
  }

  useEffect(() => {
    setShowErrorModal(error);
  }, [error]);

  const submit = () => {
    if (appId == null) {
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
    setFormValues(formValues);
    setShowModal(true);
  };

  const validate = (formValues) => {
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
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please choose a position')}
            />
            <Field
              name="companyId"
              label="Company name"
              placeholder="some company ID form now"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please choose a company')}
            />
            <Field
              name="postulantId"
              label="Postulant name"
              placeholder="some postulant ID form now"
              component={Input}
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
            <button className={styles.sendFormButton} type="submit">
              SEND
            </button>
          </form>
        )}
      />
    </div>
  );
};

export default FormApplication;
