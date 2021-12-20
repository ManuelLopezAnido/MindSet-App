import {
  GET_APPLICATIONS_FETCHING,
  GET_APPLICATIONS_FULFILLED,
  GET_APPLICATIONS_REJECTED,
  ERROR_TO_DEFAULT
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

export const errorToDefault = () => ({
  type: ERROR_TO_DEFAULT
});
