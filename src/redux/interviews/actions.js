import {
  GET_INTERVIEWS_FETCHING,
  GET_INTERVIEWS_FULFILLED,
  GET_INTERVIEWS_REJECTED,
  ERROR_TO_DEFAULT
} from './constants';

export const getInterviewsFetching = () => {
  return { type: GET_INTERVIEWS_FETCHING };
};
export const getInterviewsFulfilled = (response) => ({
  type: GET_INTERVIEWS_FULFILLED,
  payload: response
});
export const getInterviewsRejected = (error) => ({
  type: GET_INTERVIEWS_REJECTED,
  payload: error
});

export const errorToDefault = () => ({
  type: ERROR_TO_DEFAULT
});
