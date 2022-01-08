import {
  GET_CLIENTS_FETCHING,
  GET_CLIENTS_FULFILLED,
  GET_CLIENTS_REJECTED,
  GET_ONE_CLIENT_FETCHING,
  GET_ONE_CLIENT_FULFILLED,
  GET_ONE_CLIENT_REJECTED,
  ADD_CLIENT_FETCHING,
  ADD_CLIENT_FULFILLED,
  ADD_CLIENT_REJECTED,
  UPDATE_CLIENT_FETCHING,
  UPDATE_CLIENT_FULFILLED,
  UPDATE_CLIENT_REJECTED,
  DELETE_CLIENT_FETCHING,
  DELETE_CLIENT_FULFILLED,
  DELETE_CLIENT_REJECTED,
  ERROR_TO_DEFAULT,
  SELECTED_TO_DEFAULT
} from './constants';

export const getClientsFetching = () => {
  return { type: GET_CLIENTS_FETCHING };
};
export const getClientsFulfilled = (payload) => ({
  type: GET_CLIENTS_FULFILLED,
  payload
});
export const getClientsRejected = (error) => ({
  type: GET_CLIENTS_REJECTED,
  payload: error
});

export const getOneClientFetching = () => ({
  type: GET_ONE_CLIENT_FETCHING
});
export const getOneClientFulfilled = (payload) => ({
  type: GET_ONE_CLIENT_FULFILLED,
  payload
});
export const getOneClientRejected = (error) => ({
  type: GET_ONE_CLIENT_REJECTED,
  payload: error
});

export const addClientFetching = () => ({
  type: ADD_CLIENT_FETCHING
});
export const addClientFulfilled = (payload) => ({
  type: ADD_CLIENT_FULFILLED,
  payload
});
export const addClientRejected = (error) => ({
  type: ADD_CLIENT_REJECTED,
  payload: error
});

export const updateClientFetching = () => ({
  type: UPDATE_CLIENT_FETCHING
});
export const updateClientFulfilled = (payload) => ({
  type: UPDATE_CLIENT_FULFILLED,
  payload
});
export const updateClientRejected = (error) => ({
  type: UPDATE_CLIENT_REJECTED,
  payload: error
});

export const deleteClientFetching = () => ({
  type: DELETE_CLIENT_FETCHING
});
export const deleteClientFulfilled = (id) => ({
  type: DELETE_CLIENT_FULFILLED,
  payload: id
});
export const deleteClientRejected = (error) => ({
  type: DELETE_CLIENT_REJECTED,
  payload: error
});

export const errorToDefault = () => ({
  type: ERROR_TO_DEFAULT
});

export const selectedToDefault = () => ({
  type: SELECTED_TO_DEFAULT
});
