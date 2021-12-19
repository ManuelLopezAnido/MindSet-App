import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Input from 'Components/Shared/Input';
import Button from 'Components/Admin/Admins/Button';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import { getOneAdmin, addAdmin, updateAdmin } from 'redux/admins/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { errorToDefault, selectedToDefault } from 'redux/admins/actions';
import { useHistory } from 'react-router-dom';
import { Field, Form } from 'react-final-form';
import { emailValidation, passwordValidation } from 'regex';

const AdminsForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((store) => store.admins.isLoading);
  const error = useSelector((store) => store.admins.error);
  const errorMessage = useSelector((store) => store.admins.errorMessage);
  const selectedAdmin = useSelector((store) => store.admins.selected);

  const params = new URLSearchParams(window.location.search);
  const adminId = params.get('id');

  if (adminId) {
    useEffect(() => {
      dispatch(getOneAdmin(adminId));
    }, []);
  } else {
    useEffect(() => {
      //this was needed, it was also possible to have
      //selected: {} in the GET_ADMINS_FULFILLED but it
      //wouldn't work in certain situations
      dispatch(selectedToDefault());
    }, []);
  }

  const submit = () => {
    if (adminId) {
      dispatch(updateAdmin(adminId, formValues)).then((response) => {
        if (response) {
          history.push('/admin/admins');
        }
      });
    } else {
      dispatch(addAdmin(formValues)).then((response) => {
        if (response) {
          history.push('/admin/admins');
        }
      });
    }
  };

  const validate = (formValues) => {
    console.log('validating');
    const errors = {};
    if (!emailValidation.test(formValues.email)) {
      errors.email = 'Invalid email';
    }
    if (!passwordValidation.test(formValues.password)) {
      errors.password = 'At least 8 characters, one letter and one number';
      console.log('error');
    }
    return errors;
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
        onSubmit={(formValues) => {
          setFormValues(formValues);
          setShowModal(true);
        }}
        validate={validate}
        initialValues={selectedAdmin}
        render={(formProps) => (
          <form className={styles.form} onSubmit={formProps.handleSubmit}>
            <h2>Form</h2>
            <Field
              name="email"
              label="email"
              placeholder="example@geemail.com"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please enter your email')}
            />
            <Field
              name="password"
              label="Password"
              placeholder="*********"
              type="password"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please enter your password')}
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

export default AdminsForm;
