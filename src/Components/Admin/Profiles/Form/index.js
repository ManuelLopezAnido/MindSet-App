import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import Input from 'Components/Shared/FormInput';
import SaveButton from 'Components/Shared/SaveButton';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import { getOneProfile, addProfile, updateProfile } from 'redux/profiles/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { errorToDefault, selectedToDefault } from 'redux/profiles/actions';
import { Field, Form } from 'react-final-form';
import { useHistory } from 'react-router-dom';

const ProfilesForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((store) => store.profiles.isLoading);
  const error = useSelector((store) => store.profiles.error);
  const errorMessage = useSelector((store) => store.profiles.errorMessage);
  const selectedProfile = useSelector((store) => store.profiles.selected);

  const params = new URLSearchParams(window.location.search);
  const profileId = params.get('id');

  if (profileId) {
    useEffect(() => {
      dispatch(getOneProfile(profileId));
    }, []);
  } else {
    useEffect(() => {
      dispatch(selectedToDefault());
    }, []);
  }

  const submit = () => {
    if (profileId) {
      dispatch(updateProfile(profileId, formValues)).then((response) => {
        if (response) {
          history.push('/admin/profiles');
        }
      });
    } else {
      dispatch(addProfile(formValues)).then((response) => {
        if (response) {
          history.push('/admin/profiles');
        }
      });
    }
  };

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
        closeModal={() => errorToDefault()}
        titleText="Error"
        middleText={errorMessage}
        buttonText="ok"
      />
      <Form
        onSubmit={onSubmit}
        initialValues={selectedProfile}
        render={(formProps) => (
          <form className={styles.form} onSubmit={formProps.handleSubmit}>
            <h2>Form</h2>
            <Field
              name="name"
              label="Name"
              type="string"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please enter the name of the profile')}
            />
            <Field
              name="description"
              label="Description"
              type="string"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please enter a description')}
            />
            <SaveButton type="submit" disabled={formProps.submitting || formProps.pristine} />
          </form>
        )}
      />
    </div>
  );
};

export default ProfilesForm;
