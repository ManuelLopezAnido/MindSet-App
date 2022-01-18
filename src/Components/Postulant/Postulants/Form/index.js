import { useEffect, useState } from 'react';
import styles from './form.module.css';
import Input from 'Components/Shared/FormInput';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
import SaveButton from 'Components/Shared/SaveButton';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import { getOnePostulant, addPostulant, updatePostulant } from 'redux/postulants/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { errorToDefault, selectedToDefault } from 'redux/postulants/actions';
import { useHistory } from 'react-router-dom';
import { Field, Form } from 'react-final-form';
import { validateEmail } from 'validations';

const PostulantsForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((store) => store.postulants.isLoading);
  const error = useSelector((store) => store.postulants.error);
  const errorMessage = useSelector((store) => store.postulants.errorMessage);
  const selectedPostulant = useSelector((store) => store.postulants.selected);

  const params = new URLSearchParams(window.location.search);
  const postulantId = params.get('id');

  if (postulantId) {
    useEffect(() => {
      dispatch(getOnePostulant(postulantId));
    }, []);
  } else {
    useEffect(() => {
      dispatch(selectedToDefault());
    }, []);
  }

  const submit = () => {
    if (postulantId) {
      dispatch(updatePostulant(postulantId, formValues)).then((response) => {
        if (response) {
          history.push('/postulant');
        }
      });
    } else {
      dispatch(addPostulant(formValues)).then((response) => {
        if (response) {
          history.push('/postulant');
        }
      });
    }
  };

  const validate = (formValues) => {
    const errors = {};
    errors.email = validateEmail(formValues.email);
    return errors;
  };

  const onSubmit = (formValues) => {
    console.log('onsubmit');
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
      <div className={styles.header}>
        <h1>Edit your profile</h1>
        <div className={styles.imagePostulant}>
          <img
            className={styles.logoPostulant}
            src="http://3.bp.blogspot.com/_nKcd5vPHWY4/TJN_ySnkWCI/AAAAAAAAYvs/7h2_Z78Poj4/w1200-h630-p-k-no-nu/timthumb.jpg"
          />
        </div>
        <div className={styles.postulantName}>
          {`${selectedPostulant.firstName} ${selectedPostulant.lastName}`}
        </div>
        <div className={styles.postulantDetails}>
          {`${selectedPostulant.openToWork ? 'Open to Work' : 'Not Available to Work'}`}
        </div>
      </div>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={selectedPostulant}
        render={(formProps) => (
          <form className={styles.form} onSubmit={formProps.handleSubmit}>
            <div className={styles.sections}>
              <p>Personal information</p>
              <Field
                name="firstName"
                label="First Name"
                type="text"
                component={Input}
                disabled={formProps.submitting}
                validate={(value) => (value ? undefined : 'please enter your first name')}
              />
              <Field
                label="Last Name"
                name="lastName"
                type="text"
                component={Input}
                disabled={formProps.submitting}
                validate={(value) => (value ? undefined : 'please enter your last name')}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="example@geemail.com"
                component={Input}
                disabled={formProps.submitting}
                validate={(value) => (value ? undefined : 'please enter an email')}
              />
              <Field
                label="Phone"
                name="phone"
                type="number"
                component={Input}
                disabled={formProps.submitting}
                validate={(value) => (value ? undefined : 'please enter a phone')}
              />
              <Field
                label="Date Of Birth"
                name="dateOfBirth"
                type="date"
                component={Input}
                disabled={formProps.submitting}
                validate={(value) => (value ? undefined : 'please enter a date')}
              />
              <Field
                label="Gender"
                name="gender"
                type="text"
                component={Input}
                disabled={formProps.submitting}
                validate={(value) => (value ? undefined : 'please enter a gender')}
              />
              <Field
                label="City"
                name="city"
                type="text"
                component={Input}
                disabled={formProps.submitting}
                validate={(value) => (value ? undefined : 'please enter a city')}
              />
              <Field
                label="State"
                name="state"
                type="text"
                component={Input}
                disabled={formProps.submitting}
                validate={(value) => (value ? undefined : 'please enter a state')}
              />
              <Field
                label="Country"
                name="country"
                type="text"
                component={Input}
                disabled={formProps.submitting}
                validate={(value) => (value ? undefined : 'please enter a country')}
              />
            </div>
            <div className={styles.sections}>
              <p>Academic Information</p>
              <Field
                label="Elementary School"
                name="elementarySchool"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="Degree"
                name="elementarySchoolDegree"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="Graduate Year"
                name="elementarySchoolGraduateYear"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="High School"
                name="highSchool"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="Degree"
                name="highSchoolDegree"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="Graduate Year"
                name="highSchoolGraduateYear"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="Junior College"
                name="juniorCollege"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="Degree"
                name="juniorCollegeDegree"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="Graduate Year"
                name="juniorCollegeGraduateYear"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="University"
                name="University"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="Degree"
                name="UniversityDegree"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="Graduate Year"
                name="UniversityGraduateYear"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
            </div>
            <div className={styles.sections}>
              <p>Work experience information</p>
              <Field
                label="Title"
                name="workExperience"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="Started"
                name="WorkExpStarted"
                type="date"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="Ended"
                name="WorkExpEnded"
                type="date"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="Company"
                name="WorkExpClient"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="Description"
                name="workExpDescription"
                type="textarea"
                component={Input}
                disabled={formProps.submitting}
              />
            </div>
            <div className={styles.sections}>
              <p>Data of interest</p>
              <Field
                label="Open to work"
                type="checkbox"
                name="openToWork"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="Languages"
                name="languages"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="Hobbies"
                name="hobbies"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
            </div>
            <div className={styles.sections}>
              <p>Availability</p>
              <Field
                label="Monday"
                type="checkbox"
                name="mondayDay1"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="from"
                name="fromDay1"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="To"
                name="ToDay1"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="Tuesday"
                type="checkbox"
                name="tuesdayDay2"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="from"
                name="fromDay2"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="To"
                name="ToDay2"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="Wednesday"
                name="checkbox"
                id="WednesdayDay3"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="from"
                name="fromDay3"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="To"
                name="ToDay3"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="Thursday"
                name="checkbox"
                id="ThursdayDay4"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="from"
                name="fromDay4"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="To"
                name="ToDay4"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="Friday"
                type="checkbox"
                name="FridayDay5"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="from"
                name="fromDay5"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="To"
                name="ToDay5"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="Saturday"
                type="checkbox"
                name="SaturdayDay6"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="from"
                name="fromDay6"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="To"
                name="ToDay6"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="Sunday"
                type="checkbox"
                name="SundayDay7"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="from"
                name="fromDay7"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
              <Field
                label="To"
                name="ToDay7"
                type="text"
                component={Input}
                disabled={formProps.submitting}
              />
            </div>
            <SaveButton type="submit" disabled={formProps.submitting || formProps.pristine} />
          </form>
        )}
      />
    </div>
  );
};

export default PostulantsForm;
