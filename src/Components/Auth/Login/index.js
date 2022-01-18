import { Form, Field } from 'react-final-form';
import { useHistory } from 'react-router-dom';
import Input from 'Components/Shared/LoginInput';
import Modal from 'Components/Shared/Modal';
import Button2 from 'Components/Shared/Button2';
import { login } from 'redux/auth/thunks';
import { cleanError } from 'redux/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './login.module.css';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';

const Login = () => {
  const error = useSelector((store) => store.auth.error);
  const isLoading = useSelector((store) => store.auth.isFetching);

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (formValues) => {
    return dispatch(login(formValues)).then((response) => {
      if (response) {
        switch (response.payload?.role) {
          case 'postulant':
            return history.push(`/postulant?id=${response.payload?.mongoDBID}`);
          case 'admin':
            return history.push(`/admin?id=${response.payload?.mongoDBID}`);
          case 'psychologist':
            return history.push(`/psychologists?id=${response.payload?.mongoDBID}`);
          default:
            break;
        }
      }
    });
  };

  const required = (value) => (value ? undefined : 'Required');

  if (isLoading) {
    return <IsLoading />;
  }

  return (
    <div className={styles.container}>
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
          <form onSubmit={formProps.handleSubmit} className={styles.form}>
            <h2>Log in</h2>
            <Field
              name="email"
              placeholder="Insert Email"
              disabled={formProps.submitting}
              component={Input}
              validate={required}
            />
            <Field
              name="password"
              placeholder="Insert Password"
              type="password"
              disabled={formProps.submitting}
              component={Input}
              validate={required}
            />
            <Button2
              type="submit"
              text="Continue"
              disabled={formProps.submitting || formProps.pristine}
            ></Button2>
          </form>
        )}
      />
    </div>
  );
};

export default Login;
