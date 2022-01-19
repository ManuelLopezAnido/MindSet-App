import React from 'react';
import { Form, Field } from 'react-final-form';
import Input from 'Components/Shared/FormInput';
import Button2 from 'Components/Shared/Button2';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail, validatePassword } from 'validations';
import styles from './register.module.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { addPostulant } from 'redux/postulants/thunks';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import { login } from 'redux/auth/thunks';

const Register = () => {
  const isLoading = useSelector((store) => store.postulants.isLoading);
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
      dateOfBirth: '-',
      city: '-',
      state: '-',
      country: '-',
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
        const formValuesLogin = { email: formValuesOk.email, password: formValuesOk.password };
        dispatch(login(formValuesLogin)).then((response) => {
          if (response) {
            history.push(`/auth/signUp?id=${response.data.mongoDBID}`);
          }
        });
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

  if (isLoading) {
    return <IsLoading />;
  }

  return (
    <div className={styles.container}>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={(formProps) => (
          <form onSubmit={formProps.handleSubmit} className={styles.form}>
            <h2>Register</h2>
            <div>
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
            </div>
            <div>
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
            </div>
            <Field
              name="email"
              label="Email"
              placeholder="Insert Email"
              disabled={formProps.submitting}
              component={Input}
              validate={required}
            />
            <div>
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
                label="repeatPassword"
                type="password"
                autocomplete="current-password"
                disabled={formProps.submitting}
                component={Input}
                validate={(value) =>
                  value !== formProps.values.password ? 'does not match' : undefined
                }
              />
            </div>
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
