import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';

export const loginPending = () => {
  return { type: LOGIN_PENDING };
};
export const loginSuccess = (data) => {
  return { type: LOGIN_SUCCESS, payload: data }; //!data is not being used right now
};
export const loginError = (error) => {
  return { type: LOGIN_ERROR, payload: error };
};
