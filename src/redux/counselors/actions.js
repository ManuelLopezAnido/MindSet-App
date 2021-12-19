import {
  GET_COUNSELORS_FETCHING,
  GET_COUNSELORS_FULFILLED,
  GET_COUNSELORS_REJECTED,
  GET_ONE_COUNSELOR_FETCHING,
  GET_ONE_COUNSELOR_FULFILLED,
  GET_ONE_COUNSELOR_REJECTED,
  ADD_COUNSELOR_FETCHING,
  ADD_COUNSELOR_FULFILLED,
  ADD_COUNSELOR_REJECTED,
  UPDATE_COUNSELOR_FETCHING,
  UPDATE_COUNSELOR_FULFILLED,
  UPDATE_COUNSELOR_REJECTED,
  DELETE_COUNSELOR_FETCHING,
  DELETE_COUNSELOR_FULFILLED,
  DELETE_COUNSELOR_REJECTED,
  ERROR_TO_DEFAULT
} from './constants';

export const getCounselorsFetching = () => {
  return { type: GET_COUNSELORS_FETCHING };
};
export const getCounselorsFulfilled = (payload) => ({
  type: GET_COUNSELORS_FULFILLED,
  payload
});
export const getCounselorsRejected = (error) => ({
  type: GET_COUNSELORS_REJECTED,
  payload: error
});

export const getOneCounselorFetching = () => ({
  type: GET_ONE_COUNSELOR_FETCHING
});
export const getOneCounselorFulfilled = (payload) => ({
  type: GET_ONE_COUNSELOR_FULFILLED,
  payload
});
export const getOneCounselorRejected = (error) => ({
  type: GET_ONE_COUNSELOR_REJECTED,
  payload: error
});

export const addCounselorFetching = () => ({
  type: ADD_COUNSELOR_FETCHING
});
export const addCounselorFulfilled = (payload) => ({
  type: ADD_COUNSELOR_FULFILLED,
  payload
});
export const addCounselorRejected = (error) => ({
  type: ADD_COUNSELOR_REJECTED,
  payload: error
});

export const updateCounselorFetching = () => ({
  type: UPDATE_COUNSELOR_FETCHING
});
export const updateCounselorFulfilled = (payload) => ({
  type: UPDATE_COUNSELOR_FULFILLED,
  payload
});
export const updateCounselorRejected = (error) => ({
  type: UPDATE_COUNSELOR_REJECTED,
  payload: error
});

export const deleteCounselorFetching = () => ({
  type: DELETE_COUNSELOR_FETCHING
});
export const deleteCounselorFulfilled = (id) => ({
  type: DELETE_COUNSELOR_FULFILLED,
  payload: id
});
export const deleteCounselorRejected = (error) => ({
  type: DELETE_COUNSELOR_REJECTED,
  payload: error
});

export const errorToDefault = () => ({
  type: ERROR_TO_DEFAULT
});
