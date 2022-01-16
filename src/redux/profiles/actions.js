import {
  GET_PROFILES_FETCHING,
  GET_PROFILES_FULFILLED,
  GET_PROFILES_REJECTED,
  GET_ONE_PROFILE_FETCHING,
  GET_ONE_PROFILE_FULFILLED,
  GET_ONE_PROFILE_REJECTED,
  ADD_PROFILE_FETCHING,
  ADD_PROFILE_FULFILLED,
  ADD_PROFILE_REJECTED,
  UPDATE_PROFILE_FETCHING,
  UPDATE_PROFILE_FULFILLED,
  UPDATE_PROFILE_REJECTED,
  DELETE_PROFILE_FETCHING,
  DELETE_PROFILE_FULFILLED,
  DELETE_PROFILE_REJECTED,
  ERROR_TO_DEFAULT,
  SELECTED_TO_DEFAULT
} from './constants';

export const getProfilesFetching = () => {
  return { type: GET_PROFILES_FETCHING };
};
export const getProfilesFulfilled = (payload) => ({
  type: GET_PROFILES_FULFILLED,
  payload
});
export const getProfilesRejected = (error) => ({
  type: GET_PROFILES_REJECTED,
  payload: error
});

export const getOneProfileFetching = () => ({
  type: GET_ONE_PROFILE_FETCHING
});
export const getOneProfileFulfilled = (payload) => ({
  type: GET_ONE_PROFILE_FULFILLED,
  payload
});
export const getOneProfileRejected = (error) => ({
  type: GET_ONE_PROFILE_REJECTED,
  payload: error
});

export const addProfileFetching = () => ({
  type: ADD_PROFILE_FETCHING
});
export const addProfileFulfilled = (payload) => ({
  type: ADD_PROFILE_FULFILLED,
  payload
});
export const addProfileRejected = (error) => ({
  type: ADD_PROFILE_REJECTED,
  payload: error
});

export const updateProfileFetching = () => ({
  type: UPDATE_PROFILE_FETCHING
});
export const updateProfileFulfilled = (payload) => ({
  type: UPDATE_PROFILE_FULFILLED,
  payload
});
export const updateProfileRejected = (error) => ({
  type: UPDATE_PROFILE_REJECTED,
  payload: error
});

export const deleteProfileFetching = () => ({
  type: DELETE_PROFILE_FETCHING
});
export const deleteProfileFulfilled = (id) => ({
  type: DELETE_PROFILE_FULFILLED,
  payload: id
});
export const deleteProfileRejected = (error) => ({
  type: DELETE_PROFILE_REJECTED,
  payload: error
});

export const errorToDefault = () => ({
  type: ERROR_TO_DEFAULT
});

export const selectedToDefault = () => ({
  type: SELECTED_TO_DEFAULT
});
