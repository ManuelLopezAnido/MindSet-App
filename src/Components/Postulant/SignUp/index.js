import React from 'react';
import Input from 'Components/Shared/FormInput';
import Wizard from './Wizard';
import styles from './signUp.module.css';
import { useSelector } from 'react-redux';
import { Field } from 'react-final-form';

const onSubmit = (formValues) => {
  window.alert(JSON.stringify(formValues, 0, 2));
};

const required = (value) => (value ? undefined : 'Required');

const SignUp = () => {
  const step = useSelector((store) => store.ui.step);

  return (
    <div className={styles.container}>
      <div className={styles.stepper}>
        <div className={`${styles.step} ${step === 1 ? styles.active : ''}`}>1</div>
        <div className={styles.stepDivisor}></div>
        <div className={`${styles.step} ${step === 2 ? styles.active : ''}`}>2</div>
        <div className={styles.stepDivisor}></div>
        <div className={`${styles.step} ${step === 3 ? styles.active : ''}`}>3</div>
        <div className={styles.stepDivisor}></div>
        <div className={`${styles.step} ${step === 4 ? styles.active : ''}`}>4</div>
        <div className={styles.stepDivisor}></div>
        <div className={`${styles.step} ${step === 5 ? styles.active : ''}`}>5</div>
      </div>
      <div className={styles.personalInfo}>
        <h2>Personal Information</h2>
        <img></img>
      </div>
      <Wizard initialValues={{}} onSubmit={onSubmit}>
        <div className={styles.wizard}>
          <h3>General Information</h3>
          <div className={styles.rowInput}>
            <Field
              name="firstName"
              label="First Name"
              type="text"
              className={styles.names}
              component={Input}
              validate={required}
            />
            <Field
              component={Input}
              label="Last Name"
              name="lastName"
              type="text"
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
          <h3>
            Open for Work
            <input type="checkbox" name="openToWork" />
          </h3>
          <label htmlFor="openToWork" />
        </div>
        <div className={styles.workExperience}>
          <h3>Work Experience</h3>
          <Field component={Input} label="Title" name="workExperience" type="text" />
          <Field component={Input} label="Started" name="WorkExpStarted" type="date" />
          <Field
            component={Input}
            label="Ended"
            name="WorkExpEnded"
            type="date" //HERE
          />
          <Field component={Input} label="Client" name="WorkExpClient" type="text" />
          <Field component={Input} label="Description" name="workExpDescription" type="textarea" />
        </div>
        <div>
          <Field component={Input} label="Description" name="aVeChe" type="textarea" />
        </div>
      </Wizard>
    </div>
  );
};

export default SignUp;
