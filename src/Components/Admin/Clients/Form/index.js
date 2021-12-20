import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import Input from 'Components/Shared/Input';
import Button from 'Components/Admin/Clients/Button';
import ErrorModal from 'Components/Shared/ErrorModal';
import Modal from 'Components/Shared/Modal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import { getOneClient, addClient, updateClient } from 'redux/clients/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { errorToDefault, selectedToDefault } from 'redux/admins/actions';
import { Field, Form } from 'react-final-form';
import { useHistory } from 'react-router-dom';
import { validateEmail, validatePhone } from 'validations';

const ClientsForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((store) => store.clients.isLoading);
  const error = useSelector((store) => store.clients.error);
  const errorMessage = useSelector((store) => store.clients.errorMessage);
  const selectedClient = useSelector((store) => store.clients.selected);

  const params = new URLSearchParams(window.location.search);
  const clientId = params.get('id');

  if (clientId) {
    useEffect(() => {
      dispatch(getOneClient(clientId));
    }, []);
  } else {
    useEffect(() => {
      dispatch(selectedToDefault());
    }, []);
  }

  const submit = () => {
    if (clientId) {
      console.log(formValues);
      dispatch(updateClient(clientId, formValues)).then((response) => {
        if (response) {
          history.push('/admin/clients');
        }
      });
    } else {
      console.log(formValues);
      dispatch(addClient(formValues)).then((response) => {
        if (response) {
          history.push('/admin/clients');
        }
      });
    }
  };

  const validate = (formValues) => {
    const errors = {};
    errors.email = validateEmail(formValues.email);
    errors.phone = validatePhone(formValues.phone);
    return errors;
  };

  const onSubmit = (formValues) => {
    setFormValues(formValues);
    setShowModal(true);
  };

  if (isLoading) return <IsLoading />;

  return (
    <div className={styles.form}>
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
        showModal={error}
        closeModal={() => dispatch(errorToDefault())}
        titleText="Error"
        middleText={errorMessage}
        buttonText="ok"
      />
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={selectedClient}
        render={(formProps) => (
          <form className={styles.form} onSubmit={formProps.handleSubmit}>
            <Field
              label="Company Name"
              id="companyName"
              name="companyName"
              type="string"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please enter the company name')}
            />
            <Field
              label="Company Type"
              id="companyType"
              name="companyType"
              type="string"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please enter the company type')}
            />
            <Field
              label="City"
              id="city"
              name="city"
              type="string"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please enter a city')}
            />
            <Field
              label="Country"
              id="country"
              name="country"
              type="string"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please enter a country')}
            />
            <Field
              label="Email"
              id="email"
              name="email"
              type="email"
              required
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please enter an email')}
            />
            <Field
              label="Phone"
              id="phone"
              name="phone"
              type="number"
              required
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please enter a number phone')}
            />
            <Field
              label="Open Positions"
              id="openPositions"
              name="openPositions"
              component={Input}
              disabled={formProps.submitting}
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

export default ClientsForm;
