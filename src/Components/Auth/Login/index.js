import { Form, Field } from 'react-final-form';
import { useHistory } from 'react-router-dom';
import Input from 'Components/Shared/FormInput';
import Modal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button/Button.js';
import { login } from 'redux/auth/thunks';
import { cleanError } from 'redux/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import HomePageHeader from 'Components/Layout/HomePage/HomePageHeader';

const Login = () => {
  const error = useSelector((store) => store.auth.error);

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (formValues) => {
    console.log(formValues);
    return dispatch(login(formValues)).then((response) => {
      console.log(response);
      // if (response) {
      //   switch (response.payload?.role) {
      //     case 'POSTULANT':
      //       return history.push('/postulant');
      //     case 'ADMIN':
      //       return history.push('/admin');
      //     default:
      //       break;
      //   }
      // }
    });
  };

  const required = (value) => (value ? undefined : 'Required');

  return (
    <>
      <Modal
        showModal={!!error}
        closeModal={() => {
          dispatch(cleanError());
        }}
        titleText="Error"
        spanObjectArray={[
          {
            span: error
          }
        ]}
        leftButtonText=""
        rightButtonText="ok"
      />
      <Form
        onSubmit={onSubmit}
        render={(formProps) => (
          <form onSubmit={formProps.handleSubmit}>
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
              disabled={formProps.submitting}
              component={Input}
              validate={required}
            />
            <Button
              type="submit"
              // className={styles.submitButton}
              disabled={formProps.submitting || formProps.pristine}
            ></Button>
          </form>
        )}
      />
    </>
  );
};

export default Login;
