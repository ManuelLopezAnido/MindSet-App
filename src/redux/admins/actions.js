import {
  GET_ADMINS_FETCHING,
  GET_ADMINS_FULFILLED,
  GET_ADMINS_REJECTED,
  GET_ONE_ADMIN_FETCHING,
  GET_ONE_ADMIN_FULFILLED,
  GET_ONE_ADMIN_REJECTED,
  ADD_ADMIN_FETCHING,
  ADD_ADMIN_FULFILLED,
  ADD_ADMIN_REJECTED,
  UPDATE_ADMIN_FETCHING,
  UPDATE_ADMIN_FULFILLED,
  UPDATE_ADMIN_REJECTED,
  DELETE_ADMIN_FETCHING,
  DELETE_ADMIN_FULFILLED,
  DELETE_ADMIN_REJECTED
} from './constants';

export const getAdminsFetching = () => {
  return { type: GET_ADMINS_FETCHING };
};
export const getAdminsFulfilled = (payload) => ({
  type: GET_ADMINS_FULFILLED,
  payload
});
export const getAdminsRejected = (error) => ({
  type: GET_ADMINS_REJECTED,
  payload: error
});

export const getOneAdminFetching = () => ({
  type: GET_ONE_ADMIN_FETCHING
});
export const getOneAdminFulfilled = (payload) => ({
  type: GET_ONE_ADMIN_FULFILLED,
  payload
});
export const getOneAdminRejected = (error) => ({
  type: GET_ONE_ADMIN_REJECTED,
  payload: error
});

export const addAdminFetching = () => ({
  type: ADD_ADMIN_FETCHING
});
export const addAdminFulfilled = (payload) => ({
  type: ADD_ADMIN_FULFILLED,
  payload
});
export const addAdminRejected = (error) => ({
  type: ADD_ADMIN_REJECTED,
  payload: error
});

export const updateAdminFetching = () => ({
  type: UPDATE_ADMIN_FETCHING
});
export const updateAdminFulfilled = (payload) => ({
  type: UPDATE_ADMIN_FULFILLED,
  payload
});
export const updateAdminRejected = (error) => ({
  type: UPDATE_ADMIN_REJECTED,
  payload: error
});

export const deleteAdminFetching = () => ({
  type: DELETE_ADMIN_FETCHING
});
export const deleteAdminFulfilled = (id) => ({
  type: DELETE_ADMIN_FULFILLED,
  payload: id
});
export const deleteAdminRejected = (error) => ({
  type: DELETE_ADMIN_REJECTED,
  payload: error
});
