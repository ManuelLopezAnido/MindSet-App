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
    const formValuesOk = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      password: formValues.password,
      email: formValues.email,
      phone: formValues.phone,
      dateOfBirth: formValues.dateOfBirth || '',
      gender: formValues.gender || '',
      city: formValues.city || '',
      state: formValues.state || '',
      country: formValues.country || '',
      elementarySchool: [
        {
          name: formValues.elementarySchool[0]?.name || '',
          degree: formValues.elementarySchool[0]?.degree || '',
          graduateYear: formValues.elementarySchool[0]?.graduateYear || ''
        }
      ],
      highSchool: [
        {
          name: formValues.highSchool[0]?.name || '',
          degree: formValues.highSchool[0]?.degree || '',
          graduateYear: formValues.highSchool[0]?.graduateYear || ''
        }
      ],
      juniorCollege: [
        {
          name: formValues.juniorCollege[0]?.name || '',
          degree: formValues.juniorCollege[0]?.degree || '',
          graduateYear: formValues.juniorCollege[0]?.graduateYear || ''
        }
      ],
      university: [
        {
          name: formValues.university[0]?.name || '',
          degree: formValues.university[0]?.degree || '',
          graduateYear: formValues.university[0]?.graduateYear || ''
        }
      ],
      openToWork: formValues.openToWork,
      workExperience: [
        {
          title: formValues.workExperience[0]?.title || '',
          start: formValues.workExperience[0]?.start || '',
          end: formValues.workExperience[0]?.end || '',
          client: formValues.workExperience[0]?.client || '',
          description: formValues.workExperience[0]?.description || ''
        }
      ],
      languages: formValues.languages || [],
      hobbies: formValues.hobbies || '',
      profile: formValues.profile || '',
      availability: [
        {
          monday: 'Monday',
          available: formValues.mondayDay1 || '',
          from: formValues.fromDay1 || '',
          to: formValues.ToDay1 || ''
        },
        {
          Tuesday: 'Tuesday',
          available: formValues.tuesdayDay2 || '',
          from: formValues.fromDay2 || '',
          to: formValues.ToDay2 || ''
        },
        {
          Wednesday: 'Wednesday',
          available: formValues.wednesdayDay3 || '',
          from: formValues.fromDay3 || '',
          to: formValues.ToDay3 || ''
        },
        {
          Thursday: 'Thursday',
          available: formValues.thursdayDay4 || '',
          from: formValues.fromDay4 || '',
          to: formValues.ToDay4 || ''
        },
        {
          Friday: 'Friday',
          available: formValues.FridayDay5 || '',
          from: formValues.fromDay5 || '',
          to: formValues.ToDay5 || ''
        },
        {
          Saturday: 'Saturday',
          available: formValues.SaturdayDay6 || '',
          from: formValues.fromDay6 || '',
          to: formValues.ToDay6 || ''
        },
        {
          Sunday: 'Sunday',
          available: formValues.SundayDay7 || '',
          from: formValues.fromDay7 || '',
          to: formValues.ToDay7 || ''
        }
      ]
    };
    dispatch(updatePostulant(postulantId, formValuesOk)).then((response) => {
      if (response) {
        const formValuesLogin = { email: formValuesOk.email, password: formValuesOk.password };
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
            <Field component={Input} label="Date Of Birth" name="dateOfBirth" type="date" />
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
        <div className={styles.sections}>
          <p>Availability</p>
          <Field label="Monday" name="mondayDay1" type="checkbox" component={Input} />
          <Field label="from" name="fromDay1" type="text" component={Input} />
          <Field label="To" name="ToDay1" type="text" component={Input} />
          <Field label="Tuesday" name="tuesdayDay2" type="checkbox" component={Input} />
          <Field label="from" name="fromDay2" type="text" component={Input} />
          <Field label="To" name="ToDay2" type="text" component={Input} />
          <Field label="Wednesday" name="wednesdayDay3" id="WednesdayDay3" component={Input} />
          <Field label="from" name="fromDay3" type="text" component={Input} />
          <Field label="To" name="ToDay3" type="text" component={Input} />
          <Field label="Thursday" name="thursdayDay4" id="ThursdayDay4" component={Input} />
          <Field label="from" name="fromDay4" type="text" component={Input} />
          <Field label="To" name="ToDay4" type="text" component={Input} />
          <Field label="Friday" name="FridayDay5" type="checkbox" component={Input} />
          <Field label="from" name="fromDay5" type="text" component={Input} />
          <Field label="To" name="ToDay5" type="text" component={Input} />
          <Field label="Saturday" name="SaturdayDay6" type="checkbox" component={Input} />
          <Field label="from" name="fromDay6" type="text" component={Input} />
          <Field label="To" name="ToDay6" type="text" component={Input} />
          <Field label="Sunday" name="SundayDay7" type="checkbox" component={Input} />
          <Field label="from" name="fromDay7" type="text" component={Input} />
          <Field label="To" name="ToDay7" type="text" component={Input} />
        </div>
      </Wizard>
    </div>
  );
};

export default SignUp;
