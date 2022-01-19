import { useState, useEffect } from 'react';
import listStyles from 'lists.module.css';
import Input from 'Components/Shared/FormInput';
import SaveButton from 'Components/Shared/SaveButton';
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
        closeModal={() => errorToDefault()}
        titleText="Error"
        middleText={errorMessage}
        buttonText="ok"
      />
      <h2> {`${counselorId == null ? 'Add a new Counselor' : 'Edit Counselor Profile'}`} </h2>
      <div className={listStyles.containerForm}>
        <div className={listStyles.headerForm}>
          <div className={listStyles.imageEntity}>
            <img
              className={listStyles.logoEntity}
              src={
                counselorId
                  ? 'http://3.bp.blogspot.com/_nKcd5vPHWY4/TJN_ySnkWCI/AAAAAAAAYvs/7h2_Z78Poj4/w1200-h630-p-k-no-nu/timthumb.jpg'
                  : ''
              }
            />
          </div>
          <div className={listStyles.entityName}>
            {counselorId == null
              ? ''
              : `${selectedCounselor.firstName} ${selectedCounselor.lastName}`}
            <p>MindSet Counselor</p>
          </div>
        </div>
        <div className={listStyles.form}>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            initialValues={selectedCounselor}
            render={(formProps) => (
              <form className={listStyles.inputs} onSubmit={formProps.handleSubmit}>
                <div className={listStyles.fields}>
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
                </div>
                <SaveButton type="submit" disabled={formProps.submitting || formProps.pristine} />
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default CounselorsForm;
