import { loginPending, loginSuccess, loginError } from './actions';
import firebase from 'helper/firebase';

export const login = (credentials) => {
  return (dispatch) => {
    dispatch(loginPending());
    return firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(async (response) => {
        const token = await response.user.getIdToken();
        sessionStorage.setItem('token', token);
        const {
          claims: { role, mongoDBID }
        } = await response.user.getIdTokenResult();
        return dispatch(loginSuccess({ role, token, mongoDBID }));
      })
      .catch((error) => {
        return dispatch(loginError(error.toString()));
      });
  };
};
