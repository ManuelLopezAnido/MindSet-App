import {
  GET_SESSIONS_FETCHING,
  GET_SESSIONS_FULFILLED,
  GET_SESSIONS_REJECTED,
  GET_ONE_SESSION_FETCHING,
  GET_ONE_SESSION_FULFILLED,
  GET_ONE_SESSION_REJECTED,
  ADD_SESSION_FETCHING,
  ADD_SESSION_FULFILLED,
  ADD_SESSION_REJECTED,
  UPDATE_SESSION_FETCHING,
  UPDATE_SESSION_FULFILLED,
  UPDATE_SESSION_REJECTED,
  DELETE_SESSION_FETCHING,
  DELETE_SESSION_FULFILLED,
  DELETE_SESSION_REJECTED,
  ERROR_TO_DEFAULT,
  SELECTED_TO_DEFAULT
} from './constants';

export const getSessionsFetching = () => {
  return { type: GET_SESSIONS_FETCHING };
};
export const getSessionsFulfilled = (payload) => ({
  type: GET_SESSIONS_FULFILLED,
  payload
});
export const getSessionsRejected = (error) => ({
  type: GET_SESSIONS_REJECTED,
  payload: error
});

export const getOneSessionFetching = () => ({
  type: GET_ONE_SESSION_FETCHING
});
export const getOneSessionFulfilled = (payload) => ({
  type: GET_ONE_SESSION_FULFILLED,
  payload
});
export const getOneSessionRejected = (error) => ({
  type: GET_ONE_SESSION_REJECTED,
  payload: error
});

export const addSessionFetching = () => ({
  type: ADD_SESSION_FETCHING
});
export const addSessionFulfilled = (payload) => ({
  type: ADD_SESSION_FULFILLED,
  payload
});
export const addSessionRejected = (error) => ({
  type: ADD_SESSION_REJECTED,
  payload: error
});

export const updateSessionFetching = () => ({
  type: UPDATE_SESSION_FETCHING
});
export const updateSessionFulfilled = (payload) => ({
  type: UPDATE_SESSION_FULFILLED,
  payload
});
export const updateSessionRejected = (error) => ({
  type: UPDATE_SESSION_REJECTED,
  payload: error
});

export const deleteSessionFetching = () => ({
  type: DELETE_SESSION_FETCHING
});
export const deleteSessionFulfilled = (id) => ({
  type: DELETE_SESSION_FULFILLED,
  payload: id
});
export const deleteSessionRejected = (error) => ({
  type: DELETE_SESSION_REJECTED,
  payload: error
});

export const errorToDefault = () => ({
  type: ERROR_TO_DEFAULT
});

export const selectedToDefault = () => ({
  type: SELECTED_TO_DEFAULT
});
