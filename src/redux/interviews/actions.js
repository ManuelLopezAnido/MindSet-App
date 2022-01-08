import {
  GET_INTERVIEWS_FETCHING,
  GET_INTERVIEWS_FULFILLED,
  GET_INTERVIEWS_REJECTED,
  GET_ONE_INTERVIEW_FETCHING,
  GET_ONE_INTERVIEW_FULFILLED,
  GET_ONE_INTERVIEW_REJECTED,
  DELETE_INTERVIEW_FETCHING,
  DELETE_INTERVIEW_FULFILLED,
  DELETE_INTERVIEW_REJECTED,
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
export const getOneInterviewFetching = () => {
  return { type: GET_ONE_INTERVIEW_FETCHING };
};
export const getOneInterviewFulfilled = (response) => ({
  type: GET_ONE_INTERVIEW_FULFILLED,
  payload: response
});
export const getOneInterviewRejected = (error) => ({
  type: GET_ONE_INTERVIEW_REJECTED,
  payload: error
});
export const deleteInterviewFetching = () => ({
  type: DELETE_INTERVIEW_FETCHING
});
export const deleteInterviewFulfilled = (id) => ({
  type: DELETE_INTERVIEW_FULFILLED,
  payload: id
});
export const deleteInterviewRejected = (err) => ({
  type: DELETE_INTERVIEW_REJECTED,
  payload: err
});

export const errorToDefault = () => ({
  type: ERROR_TO_DEFAULT
});
