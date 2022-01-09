import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import Input from 'Components/Shared/FormInput';
import Button from 'Components/Admin/Clients/Button';
import ErrorModal from 'Components/Shared/ErrorModal';
import Modal from 'Components/Shared/Modal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import Select from 'Components/Shared/Select';
import { getOneClient, addClient, updateClient } from 'redux/clients/thunks';
import { getPositions } from 'redux/positions/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { errorToDefault, selectedToDefault } from 'redux/admins/actions';
import { Field, Form } from 'react-final-form';
import { useHistory } from 'react-router-dom';
import { validateEmail, validatePhone } from 'validations';

const ClientsForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [positionsToMap, setPositionsToMap] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((store) => store.clients.isLoading);
  const error = useSelector((store) => store.clients.error);
  const errorMessage = useSelector((store) => store.clients.errorMessage);
  const selectedClient = useSelector((store) => store.clients.selected);
  const positions = useSelector((store) => store.positions.list);

  const params = new URLSearchParams(window.location.search);
  const clientId = params.get('id');

  useEffect(() => {
    dispatch(getPositions());
    if (clientId) {
      dispatch(getOneClient(clientId));
    } else {
      dispatch(selectedToDefault());
    }
  }, []);

  useEffect(() => {
    const poss = positions.map((position) => {
      return { value: position._id, toShow: position.jobTitle };
    });
    setPositionsToMap(poss);
  }, [positions]);

  const submit = () => {
    if (clientId) {
      dispatch(updateClient(clientId, formValues)).then((response) => {
        if (response) {
          history.push('/admin/clients');
        }
      });
    } else {
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
              label="Client Name"
              id="clientName"
              name="clientName"
              type="string"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please enter the client name')}
            />
            <Field
              label="Client Type"
              id="clientType"
              name="clientType"
              type="string"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please enter the client type')}
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
              options={positionsToMap}
              multiple={true}
              component={Select}
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
