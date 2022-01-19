import React, { useEffect, useState } from 'react';
import listStyles from 'lists.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { addPosition, getOnePosition, updatePosition } from 'redux/positions/thunks';
import { getClients } from 'redux/clients/thunks';
import { getProfiles } from 'redux/profiles/thunks';
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
  const [profilesToMap, setProfilesToMap] = useState([]);
  const [clientsToMap, setClientsToMap] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((store) => store.positions.isLoading);
  const error = useSelector((store) => store.positions.error);
  const errorMessage = useSelector((store) => store.positions.errorMessage);
  const selectedPosition = useSelector((store) => store.positions.selected);
  const clients = useSelector((store) => store.clients.list);
  const profiles = useSelector((store) => store.profiles.list);
  const params = new URLSearchParams(window.location.search);
  const positionId = params.get('id');
  const clientId = params.get('client');

  useEffect(() => {
    dispatch(getClients());
    dispatch(getProfiles());
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
          history.push(`/admin/clients`);
        }
      });
    } else {
      dispatch(addPosition(formValues)).then((response) => {
        if (response) {
          history.push('/admin/clients');
        }
      });
    }
  };

  useEffect(() => {
    const prof = profiles.map((profile) => {
      return { value: profile._id, toShow: profile.name };
    });
    setProfilesToMap(prof);
    const cli = clients.map((client) => {
      return { value: client._id, toShow: client.clientName };
    });
    setClientsToMap(cli);
  }, [profiles, clients]);

  const onSubmit = (formValues) => {
    console.log(formValues);
    setFormValues(formValues);
    setShowModal(true);
  };

  if (isLoading) return <IsLoading />;

  return (
    <div className={listStyles.mainFormContainer}>
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
      <h2> {`${positionId == null ? 'Add a new Position' : 'Edit the position'}`} </h2>
      <Form
        onSubmit={onSubmit}
        initialValues={selectedPosition}
        render={(formProps) => (
          <form className={listStyles.inputs} onSubmit={formProps.handleSubmit}>
            <div className={listStyles.fields}>
              <Field
                label="Job"
                name="jobTitle"
                type="string"
                component={Input}
                disabled={formProps.submitting}
                validate={(value) => (value ? undefined : 'please enter the job title')}
              />
              <Field
                label="Client Name"
                name="clientId"
                initialValue={clientId}
                options={clientsToMap}
                component={Select}
                disabled={formProps.submitting}
              />
              <Field
                label="Job Description"
                name="jobDescription"
                type="string"
                component={Input}
                disabled={formProps.submitting}
                validate={(value) => (value ? undefined : 'please enter the job description')}
              />
              <Field
                label="City"
                name="city"
                type="string"
                component={Input}
                disabled={formProps.submitting}
                validate={(value) => (value ? undefined : 'please enter a city')}
              />
              <Field
                label="Country"
                name="country"
                type="string"
                component={Input}
                disabled={formProps.submitting}
                validate={(value) => (value ? undefined : 'please enter a country')}
              />
              <Field
                label="Profile"
                name="profile"
                options={profilesToMap}
                component={Select}
                disabled={formProps.submitting}
                validate={(value) => (value ? undefined : 'please enter a profile')}
              />
              <Field
                label="Date Posted"
                name="datePosted"
                type="date"
                component={Input}
                disabled={formProps.submitting}
                validate={(value) => (value ? undefined : 'please enter the date posted')}
              />
              <Field
                label="Closing Date"
                name="closingDate"
                type="date"
                component={Input}
                disabled={formProps.submitting}
                validate={(value) => (value ? undefined : 'please enter the closing date')}
              />
            </div>
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
