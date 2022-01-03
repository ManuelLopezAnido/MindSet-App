import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Input from 'Components/Shared/FormInput';
import Button from 'Components/Admin/Counselors/Button';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import { getOneCounselor, addCounselor, updateCounselor } from 'redux/counselors/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { errorToDefault, selectedToDefault } from 'redux/counselors/actions';
import { useHistory } from 'react-router-dom';
import { Field, Form } from 'react-final-form';
import { validateEmail, validatePhone } from 'validations';

const CounselorsForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((store) => store.counselors.isLoading);
  const error = useSelector((store) => store.counselors.error);
  const errorMessage = useSelector((store) => store.counselors.errorMessage);
  const selectedCounselor = useSelector((store) => store.counselors.selected);

  const params = new URLSearchParams(window.location.search);
  const counselorId = params.get('id');

  if (counselorId) {
    useEffect(() => {
      dispatch(getOneCounselor(counselorId));
    }, []);
  } else {
    useEffect(() => {
      dispatch(selectedToDefault());
    }, []);
  }

  const submit = () => {
    if (counselorId) {
      dispatch(updateCounselor(counselorId, formValues)).then((response) => {
        if (response) {
          history.push('/admin/counselors');
        }
      });
    } else {
      dispatch(addCounselor(formValues)).then((response) => {
        if (response) {
          history.push('/admin/counselors');
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
        validate={validate}
        initialValues={selectedCounselor}
        render={(formProps) => (
          <form className={styles.form} onSubmit={formProps.handleSubmit}>
            <h2>Form</h2>
            <Field
              label="First Name"
              name="firstName"
              type="string"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please enter your first name')}
            />
            <Field
              label="Last Name"
              name="lastName"
              type="string"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please enter your last name')}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please enter your email')}
            />
            <Field
              label="Gender"
              name="gender"
              type="string"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please enter your gender')}
            />
            <Field
              label="Address"
              name="address"
              type="string"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please enter your address')}
            />
            <Field
              label="Birthday"
              name="birthday"
              type="date"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please enter your birthday')}
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
              label="Phone"
              name="phone"
              type="number"
              component={Input}
              disabled={formProps.submitting}
              validate={(value) => (value ? undefined : 'please enter your number phone')}
            />
            <div className={styles.availabilityContainer}>
              <div className={styles.day}>
                <div className={styles.eachDay}>
                  <Field
                    label="Monday"
                    name="availability[0].available"
                    type="checkbox"
                    component={Input}
                    disabled={formProps.submitting}
                  />
                </div>
                <div>
                  <Field
                    label="From"
                    name="availability[0].from"
                    type="string"
                    component={Input}
                    disabled={formProps.submitting}
                  />
                </div>
                <div>
                  <Field
                    label="To"
                    name="availability[0].to"
                    type="string"
                    component={Input}
                    disabled={formProps.submitting}
                  />
                </div>
              </div>
              <div className={styles.day}>
                <div className={styles.eachDay}>
                  <Field
                    label="Tuesday"
                    type="checkbox"
                    name="availability[1].available"
                    component={Input}
                    disabled={formProps.submitting}
                  />
                </div>
                <div>
                  <Field
                    label="From"
                    name="availability[1].from"
                    type="string"
                    component={Input}
                    disabled={formProps.submitting}
                  />
                </div>
                <div>
                  <Field
                    label="To"
                    name="availability[1].to"
                    type="string"
                    component={Input}
                    disabled={formProps.submitting}
                  />
                </div>
              </div>
              <div className={styles.day}>
                <div className={styles.eachDay}>
                  <Field
                    label="Wednesday"
                    type="checkbox"
                    name="availability[2].available"
                    component={Input}
                    disabled={formProps.submitting}
                  />
                </div>
                <div>
                  <Field
                    label="From"
                    name="availability[2].from"
                    type="string"
                    component={Input}
                    disabled={formProps.submitting}
                  />
                </div>
                <div>
                  <Field
                    label="To"
                    name="availability[2].to"
                    type="string"
                    component={Input}
                    disabled={formProps.submitting}
                  />
                </div>
              </div>
              <div className={styles.day}>
                <div className={styles.eachDay}>
                  <Field
                    label="Thursday"
                    type="checkbox"
                    name="availability[3].available"
                    component={Input}
                    disabled={formProps.submitting}
                  />
                </div>
                <div>
                  <Field
                    label="From"
                    name="availability[3].from"
                    type="string"
                    component={Input}
                    disabled={formProps.submitting}
                  />
                </div>
                <div>
                  <Field
                    label="To"
                    name="availability[3].to"
                    type="string"
                    component={Input}
                    disabled={formProps.submitting}
                  />
                </div>
              </div>
              <div className={styles.day}>
                <div className={styles.eachDay}>
                  <Field
                    label="Friday"
                    name="availability[4].available"
                    type="checkbox"
                    component={Input}
                    disabled={formProps.submitting}
                  />
                </div>
                <div>
                  <Field
                    label="From"
                    name="availability[4].from"
                    type="string"
                    component={Input}
                    disabled={formProps.submitting}
                  />
                </div>
                <div>
                  <Field
                    label="To"
                    name="availability[4].to"
                    type="string"
                    component={Input}
                    disabled={formProps.submitting}
                  />
                </div>
              </div>
            </div>
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

export default CounselorsForm;
