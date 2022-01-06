import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CLEAN_ERROR,
  SET_AUTHENTICATION
} from './constants';

export const loginPending = () => {
  return { type: LOGIN_PENDING };
};
export const loginSuccess = (data) => {
  return { type: LOGIN_SUCCESS, payload: data }; //!data is not being used right now
};
export const loginError = (error) => {
  return { type: LOGIN_ERROR, payload: error };
};
export const cleanError = () => {
  return { type: CLEAN_ERROR };
};
export const setAuthentication = (user) => {
  return { type: SET_AUTHENTICATION, payload: user };
};
