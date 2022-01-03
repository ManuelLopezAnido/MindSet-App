import {
  GET_APPLICATIONS_FETCHING,
  GET_APPLICATIONS_FULFILLED,
  GET_APPLICATIONS_REJECTED,
  GET_ONE_APPLICATION_FETCHING,
  GET_ONE_APPLICATION_FULFILLED,
  GET_ONE_APPLICATION_REJECTED,
  ADD_APPLICATION_FETCHING,
  ADD_APPLICATION_FULFILLED,
  ADD_APPLICATION_REJECTED,
  UPDATE_APPLICATION_FETCHING,
  UPDATE_APPLICATION_FULFILLED,
  UPDATE_APPLICATION_REJECTED,
  DELETE_APPLICATION_FETCHING,
  DELETE_APPLICATION_FULFILLED,
  DELETE_APPLICATION_REJECTED,
  ERROR_TO_DEFAULT,
  SELECTED_TO_DEFAULT
} from './constants';

export const getApplicationsFetching = () => {
  return { type: GET_APPLICATIONS_FETCHING };
};
export const getApplicationsFulfilled = (response) => ({
  type: GET_APPLICATIONS_FULFILLED,
  payload: response
});
export const getApplicationsRejected = (error) => ({
  type: GET_APPLICATIONS_REJECTED,
  payload: error
});

export const getOneApplicationFetching = () => ({
  type: GET_ONE_APPLICATION_FETCHING
});
export const getOneApplicationFulfilled = (payload) => ({
  type: GET_ONE_APPLICATION_FULFILLED,
  payload
});
export const getOneApplicationRejected = (error) => ({
  type: GET_ONE_APPLICATION_REJECTED,
  payload: error
});

export const addApplicationFetching = () => ({
  type: ADD_APPLICATION_FETCHING
});
export const addApplicationFulfilled = (payload) => ({
  type: ADD_APPLICATION_FULFILLED,
  payload
});
export const addApplicationRejected = (error) => ({
  type: ADD_APPLICATION_REJECTED,
  payload: error
});

export const updateApplicationFetching = () => ({
  type: UPDATE_APPLICATION_FETCHING
});
export const updateApplicationFulfilled = (payload) => ({
  type: UPDATE_APPLICATION_FULFILLED,
  payload
});
export const updateApplicationRejected = (error) => ({
  type: UPDATE_APPLICATION_REJECTED,
  payload: error
});

export const deleteApplicationFetching = () => ({
  type: DELETE_APPLICATION_FETCHING
});
export const deleteApplicationFulfilled = (id) => ({
  type: DELETE_APPLICATION_FULFILLED,
  payload: id
});
export const deleteApplicationRejected = (error) => ({
  type: DELETE_APPLICATION_REJECTED,
  payload: error
});

export const errorToDefault = () => ({
  type: ERROR_TO_DEFAULT
});

export const selectedToDefault = () => ({
  type: SELECTED_TO_DEFAULT
});
