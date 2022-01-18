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

  const clientFound = clients.find((client) => clientId === client._id);
  const clientFindName = clientFound?.clientName;

  const submit = () => {
    let filtredClients = clients.filter((client) => {
      return client._id === formValues.clientId;
    });
    if (positionId) {
      dispatch(updatePosition(positionId, formValues, filtredClients[0]?.clientName)).then(
        (response) => {
          if (response) {
            history.push(`/admin/clients`);
          }
        }
      );
    } else {
      dispatch(addPosition(formValues, filtredClients[0]?.clientName)).then((response) => {
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
  }, [profiles]);

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
                type="text"
                initialValue={clientFindName}
                component={Input}
                disabled={true}
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
                name="profile"
                type="checkbox"
                options={profilesToMap}
                component={Select}
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
