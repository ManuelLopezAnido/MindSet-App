import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { addPosition, getOnePosition, updatePosition } from 'redux/positions/thunks';
import { getClients } from 'redux/clients/thunks';
import { errorToDefault, selectedToDefault } from 'redux/admins/actions';
import { Field, Form } from 'react-final-form';
import Input from 'Components/Shared/FormInput';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
import SaveButton from 'Components/Shared/SaveButton';
import Select from 'Components/Shared/Select';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';

const PositionsForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [clientsToMap, setClientsToMap] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((store) => store.positions.isLoading);
  const error = useSelector((store) => store.positions.error);
  const errorMessage = useSelector((store) => store.positions.errorMessage);
  const selectedPosition = useSelector((store) => store.positions.selected);
  const clients = useSelector((store) => store.clients.list);
  const params = new URLSearchParams(window.location.search);
  const positionId = params.get('id');

  useEffect(() => {
    dispatch(getClients());
    if (positionId) {
      dispatch(getOnePosition(positionId));
    } else {
      dispatch(selectedToDefault());
    }
  }, []);

  const submit = () => {
    if (positionId) {
      dispatch(updatePosition(positionId, formValues)).then((response) => {
        if (response) {
          history.push('/admin/positions');
        }
      });
    } else {
      dispatch(addPosition(formValues)).then((response) => {
        if (response) {
          history.push('/admin/positions');
        }
      });
    }
  };

  useEffect(() => {
    const cli = clients.map((client) => {
      return { value: client.clientName, toShow: client.clientName };
    });
    setClientsToMap(cli);
  }, [clients]);

  const onSubmit = (formValues) => {
    setFormValues(formValues);
    setShowModal(true);
  };

  if (isLoading) return <IsLoading />;

  return (
    <div className={styles.container}>
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
        initialValues={selectedPosition}
        render={(formProps) => (
          <form className={styles.form} onSubmit={formProps.handleSubmit}>
            <h2>Form</h2>
            <Field
              label="Job"
              id="jobTitle"
              name="jobTitle"
              type="string"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please enter the job title')}
            />
            <Field
              label="Client Name"
              id="clientName"
              name="clientName"
              type="checkbox"
              options={clientsToMap}
              component={Select}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please enter the client name')}
            />
            <Field
              label="Job Description"
              id="jobDescription"
              name="jobDescription"
              type="string"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please enter the job description')}
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
              label="Profile"
              id="profile"
              name="profil"
              type="string"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please enter a profile')}
            />
            <Field
              label="Date Posted"
              id="datePosted"
              name="datePosted"
              type="date"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please enter the date posted')}
            />
            <Field
              label="Closing Date"
              id="closingDate"
              name="closingDate"
              type="date"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please enter the closing date')}
            />
            <SaveButton
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

export default PositionsForm;
