import React, { useEffect } from 'react';
import Input from 'Components/Shared/FormInput';
import Wizard from './Wizard';
import styles from './signUp.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Field } from 'react-final-form';
import { getOnePostulant, updatePostulant } from 'redux/postulants/thunks';
import Select from 'Components/Shared/Select';
import { login } from 'redux/auth/thunks';
import { useHistory } from 'react-router-dom';

const required = (value) => (value ? undefined : 'Required');

const languages = [
  { value: 'english', toShow: 'English' },
  { value: 'spanish', toShow: 'Spanish' },
  { value: 'italian', toShow: 'Italian' },
  { value: 'german', toShow: 'German' },
  { value: 'french', toShow: 'French' },
  { value: 'dutch', toShow: 'Dutch' },
  { value: 'chinese', toShow: 'Chinese' },
  { value: 'japanese', toShow: 'Japanese' }
];

const SignUp = () => {
  const dispatch = useDispatch();
  const step = useSelector((store) => store.ui.step);
  const selectedPostulant = useSelector((store) => store.postulants.selected);

  const params = new URLSearchParams(window.location.search);
  const postulantId = params.get('id');

  const history = useHistory();

  useEffect(() => {
    dispatch(getOnePostulant(postulantId));
  }, []);

  const onSubmit = (formValues) => {
    dispatch(updatePostulant(postulantId, formValues)).then((response) => {
      if (response) {
        const formValuesLogin = { email: formValues.email, password: formValues.password };
        dispatch(login(formValuesLogin)).then((response) => {
          history.push(`/postulant?id=${response.payload?.mongoDBID}`);
        });
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.stepper}>
        <div className={`${styles.step} ${step === 0 ? styles.active : ''}`}>1</div>
        <div className={styles.stepDivisor}></div>
        <div className={`${styles.step} ${step === 1 ? styles.active : ''}`}>2</div>
        <div className={styles.stepDivisor}></div>
        <div className={`${styles.step} ${step === 2 ? styles.active : ''}`}>3</div>
        <div className={styles.stepDivisor}></div>
        <div className={`${styles.step} ${step === 3 ? styles.active : ''}`}>4</div>
        <div className={styles.stepDivisor}></div>
        <div className={`${styles.step} ${step === 4 ? styles.active : ''}`}>5</div>
      </div>
      <div className={styles.personalInfo}>
        <h2>Personal Information</h2>
        <img></img>
      </div>
      <Wizard initialValues={selectedPostulant} onSubmit={onSubmit}>
        <div className={styles.wizard}>
          <h3>General Information</h3>
          <div className={styles.rowInput}>
            <Field
              name="firstName"
              label="First Name"
              component={Input}
              className={styles.names}
              validate={required}
            />
            <Field
              name="lastName"
              label="Last Name"
              component={Input}
              className={styles.names}
              validate={required}
            />
          </div>
          <div className={styles.rowInput}>
            <Field component={Input} label="Email" name="email" type="email" validate={required} />
            <Field component={Input} label="Phone" name="phone" type="number" validate={required} />
          </div>
          <div className={styles.rowInput}>
            <Field
              component={Input}
              label="Date Of Birth"
              name="dateOfBirth"
              type="date"
              validate={required}
            />
            <Field component={Input} label="Gender" name="gender" type="text" validate={required} />
          </div>
          <div className={styles.rowInput}>
            <Field component={Input} label="City" name="city" type="text" validate={required} />
            <Field component={Input} label="State" name="state" type="text" validate={required} />
          </div>
          <div className={styles.rowInput}>
            <Field
              component={Input}
              label="Postal Code"
              name="postalCode"
              type="text"
              validate={required}
            />
            <Field
              component={Input}
              label="Country"
              name="country"
              type="text"
              validate={required}
            />
          </div>
          <div className={styles.rowInput}>
            <Field
              component={Input}
              label="Password"
              name="password"
              type="password"
              validate={required}
            />
          </div>
        </div>
        <div className={styles.studies}>
          <h3>Studies</h3>
          <h4>Elementary School</h4>
          <Field component={Input} label="Name" name="elementarySchool" type="text" />
          <Field component={Input} label="Degree" name="elementarySchoolDegree" type="text" />
          <Field
            component={Input}
            label="Graduate Year"
            name="elementarySchoolGraduateYear"
            type="text"
          />
          <h4>High School</h4>
          <Field component={Input} label="Name" name="highSchool" type="text" />
          <Field component={Input} label="Degree" name="highSchoolDegree" type="text" />
          <Field
            component={Input}
            label="Graduate Year"
            name="highSchoolGraduateYear"
            type="text"
          />
          <h4>Junior College</h4>
          <Field component={Input} label="Name" name="juniorCollege" type="text" />
          <Field component={Input} label="Degree" name="juniorCollegeDegree" type="text" />
          <Field
            component={Input}
            label="Graduate Year"
            name="juniorCollegeGraduateYear"
            type="text"
          />
          <h4>University</h4>
          <Field component={Input} label="Name" name="University" type="text" />
          <Field component={Input} label="Degree" name="UniversityDegree" type="text" />
          <Field
            component={Input}
            label="Graduate Year"
            name="UniversityGraduateYear"
            type="text"
          />
        </div>
        <div className={styles.openForWork}>
          <h3>Open for Work</h3>
          <Field component={Input} type="checkbox" name="openToWork" />
          <h3>Select up to 3 languages</h3>
          <Field component={Select} options={languages} name="languages1" />
          <Field component={Select} options={languages} name="languages2" />
          <Field component={Select} options={languages} name="languages3" />
          <Field component={Input} name="hobbies" label="Hobbies" />
        </div>
        <div className={styles.workExperience}>
          <h3>Work Experience</h3>
          <Field component={Input} label="Title" name="workExperience" type="text" />
          <Field component={Input} label="Started" name="WorkExpStarted" type="date" />
          <Field component={Input} label="Ended" name="WorkExpEnded" type="date" />
          <Field component={Input} label="Client" name="WorkExpClient" type="text" />
          <Field component={Input} label="Description" name="workExpDescription" type="textarea" />
        </div>
        <div className={styles.sections}>
          <p>Availability</p>
          <Field label="Monday" type="checkbox" name="mondayDay1" component={Input} />
          <Field label="from" name="fromDay1" type="text" component={Input} />
          <Field label="To" name="ToDay1" type="text" component={Input} />
          <Field label="Tuesday" type="checkbox" name="tuesdayDay2" component={Input} />
          <Field label="from" name="fromDay2" type="text" component={Input} />
          <Field label="To" name="ToDay2" type="text" component={Input} />
          <Field label="Wednesday" name="checkbox" id="WednesdayDay3" component={Input} />
          <Field label="from" name="fromDay3" type="text" component={Input} />
          <Field label="To" name="ToDay3" type="text" component={Input} />
          <Field label="Thursday" name="checkbox" id="ThursdayDay4" component={Input} />
          <Field label="from" name="fromDay4" type="text" component={Input} />
          <Field label="To" name="ToDay4" type="text" component={Input} />
          <Field label="Friday" type="checkbox" name="FridayDay5" component={Input} />
          <Field label="from" name="fromDay5" type="text" component={Input} />
          <Field label="To" name="ToDay5" type="text" component={Input} />
          <Field label="Saturday" type="checkbox" name="SaturdayDay6" component={Input} />
          <Field label="from" name="fromDay6" type="text" component={Input} />
          <Field label="To" name="ToDay6" type="text" component={Input} />
          <Field label="Sunday" type="checkbox" name="SundayDay7" component={Input} />
          <Field label="from" name="fromDay7" type="text" component={Input} />
          <Field label="To" name="ToDay7" type="text" component={Input} />
        </div>
      </Wizard>
    </div>
  );
};

export default SignUp;
