import React, { useEffect } from 'react';
import Input from 'Components/Shared/FormInput';
import Wizard from './Wizard';
import styles from './signUp.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Field } from 'react-final-form';
import { getOnePostulant, updatePostulant } from 'redux/postulants/thunks';
import Select from 'Components/Shared/Select';

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

  useEffect(() => {
    dispatch(getOnePostulant(postulantId));
  }, []);

  const onSubmit = (formValues) => {
    const formValuesOk = {
      email: formValues.email || '',
      password: formValues.password || '',
      firstName: formValues.firstName || '',
      lastName: formValues.lastName || '',
      address: formValues.address || '',
      phone: formValues.phone || '',
      dateOfBirth: formValues.dateOfBirth || '',
      city: formValues.city || '',
      state: formValues.state || '',
      country: formValues.country || '',
      elementarySchool: [
        {
          name: formValues.elementarySchool,
          degree: formValues.elementarySchoolDegree,
          graduateYear: formValues.elementarySchoolGraduateYear
        }
      ],
      highSchool: [
        {
          name: formValues.highSchool,
          degree: formValues.highSchoolDegree,
          graduateYear: formValues.highSchoolGraduateYear
        }
      ],
      juniorCollege: [
        {
          name: formValues.juniorCollege,
          degree: formValues.juniorCollegeDegree,
          graduateYear: formValues.juniorCollegeGraduateYear
        }
      ],
      university: [
        {
          name: formValues.University,
          degree: formValues.UniversityDegree,
          graduateYear: formValues.UniversityGraduateYear
        }
      ],
      openToWork: formValues.openToWork,
      languages: [
        formValues.languages1 || '',
        formValues.languages2 || '',
        formValues.languages3 || ''
      ],
      hobbies: formValues.hobbies,
      workExperience: [
        {
          title: formValues.workExperience,
          start: formValues.WorkExpStarted,
          end: formValues.WorkExpEnded,
          client: formValues.WorkExpClient,
          description: formValues.workExpDescription
        }
      ]
      // availability: [
      //   {
      //     monday: 'Monday',
      //     available: formValues.availability[0]?.available,
      //     from: formValues.availability[0]?.from,
      //     to: formValues.availability[0]?.to
      //   },
      //   {
      //     Tuesday: 'Tuesday',
      //     available: formValues.availability[1]?.available,
      //     from: formValues.availability[1]?.from,
      //     to: formValues.availability[1]?.to
      //   },
      //   {
      //     Wednesday: 'Wednesday',
      //     available: formValues.availability[2]?.available,
      //     from: formValues.availability[2]?.from,
      //     to: formValues.availability[2]?.to
      //   },
      //   {
      //     Thursday: 'Thursday',
      //     available: formValues.availability[3]?.available,
      //     from: formValues.availability[3]?.from,
      //     to: formValues.availability[3]?.to
      //   },
      //   {
      //     Friday: 'Friday',
      //     available: formValues.availability[4]?.available,
      //     from: formValues.availability[4]?.from,
      //     to: formValues.availability[4]?.to
      //   },
      //   {
      //     Saturday: 'Saturday',
      //     available: formValues.availability[5]?.available,
      //     from: formValues.availability[5]?.from,
      //     to: formValues.availability[5]?.to
      //   },
      //   {
      //     Sunday: 'Sunday',
      //     available: formValues.availability[6]?.available,
      //     from: formValues.availability[6]?.from,
      //     to: formValues.availability[6]?.to
      //   }
      // ]
    };
    console.log('formValues', formValues);
    console.log('formValuesOk', formValuesOk);
    // dispatch(updatePostulant(postulantId, formValuesOk)).then((response) => {
    //   if (response) {
    //     history.push(`/?registered=true`);
    //   }
    // });
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
        <div>availability here</div>
      </Wizard>
    </div>
  );
};

export default SignUp;
