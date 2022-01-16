import React from 'react';
import { Form, Field } from 'react-final-form';
import Input from 'Components/Shared/FormInput';
import Button2 from 'Components/Shared/Button2';
import { useDispatch } from 'react-redux';
import { validateEmail, validatePassword } from 'validations';
import styles from './register.module.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { addPostulant } from 'redux/postulants/thunks';

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (formValues) => {
    const formValuesOk = {
      email: formValues.email,
      password: formValues.password,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      address: formValues.address,
      phone: formValues.phone,
      dateOfBirth: 'blank', //these are here because the server was throwing an error.
      city: 'blank',
      state: 'blank',
      country: 'blank',
      elementarySchool: '',
      highSchool: '',
      juniorCollege: '',
      university: '',
      openToWork: '',
      workExperience: '',
      professionalTraining: '',
      languages: '',
      hobbies: '',
      familyMembers: '',
      availability: ''
    };
    dispatch(addPostulant(formValuesOk)).then((response) => {
      if (response) {
        history.push('/postulant/signUp');
      }
    });
  };

  const validate = (formValues) => {
    const errors = {};
    errors.email = validateEmail(formValues.email);
    errors.password = validatePassword(formValues.password);
    return errors;
  };

  const required = (value) => (value ? undefined : 'Required');

  return (
    <div className={styles.container}>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={(formProps) => (
          <form onSubmit={formProps.handleSubmit} className={styles.form}>
            <h2>Register</h2>
            <Field
              name="firstName"
              label="Name"
              placeholder="john"
              disabled={formProps.submitting}
              component={Input}
              validate={required}
            />
            <Field
              name="lastName"
              label="Last Name"
              placeholder="Petrucci"
              disabled={formProps.submitting}
              component={Input}
              validate={required}
            />
            <Field
              name="phone"
              label="Phone number"
              placeholder="341 6443896"
              type="number"
              disabled={formProps.submitting}
              component={Input}
              validate={required}
            />
            <Field
              name="address"
              label="Address"
              placeholder="Juan Jose Paso 8065"
              disabled={formProps.submitting}
              component={Input}
              validate={required}
            />
            <Field
              name="email"
              label="Email"
              placeholder="Insert Email"
              disabled={formProps.submitting}
              component={Input}
              validate={required}
            />
            <Field
              name="password"
              label="Password"
              placeholder="Insert Password"
              type="password"
              autocomplete="current-password"
              disabled={formProps.submitting}
              component={Input}
              validate={required}
            />
            <Field
              name="repeatPassword"
              label="Password"
              placeholder="repeat Password"
              type="password"
              autocomplete="current-password"
              disabled={formProps.submitting}
              component={Input}
              validate={(value) =>
                value !== formProps.values.password ? 'does not match' : undefined
              }
            />
            <Button2
              type="submit"
              text="Continue"
              disabled={formProps.submitting || formProps.pristine}
            ></Button2>
            {/* <pre>{JSON.stringify(formProps.values, 0, 2)}</pre> */}
          </form>
        )}
      />
    </div>
  );
};

export default Register;
