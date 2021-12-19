import {
  GET_POSTULANTS_FETCHING,
  GET_POSTULANTS_FULFILLED,
  GET_POSTULANTS_REJECTED,
  GET_ONE_POSTULANT_FETCHING,
  GET_ONE_POSTULANT_FULFILLED,
  GET_ONE_POSTULANT_REJECTED,
  ADD_POSTULANT_FETCHING,
  ADD_POSTULANT_FULFILLED,
  ADD_POSTULANT_REJECTED,
  UPDATE_POSTULANT_FETCHING,
  UPDATE_POSTULANT_FULFILLED,
  UPDATE_POSTULANT_REJECTED,
  DELETE_POSTULANT_FETCHING,
  DELETE_POSTULANT_FULFILLED,
  DELETE_POSTULANT_REJECTED,
  ERROR_TO_DEFAULT
} from './constants';

export const getPostulantsFetching = () => {
  return { type: GET_POSTULANTS_FETCHING };
};
export const getPostulantsFulfilled = (payload) => ({
  type: GET_POSTULANTS_FULFILLED,
  payload
});
export const getPostulantsRejected = (error) => ({
  type: GET_POSTULANTS_REJECTED,
  payload: error
});

export const getOnePostulantFetching = () => ({
  type: GET_ONE_POSTULANT_FETCHING
});
export const getOnePostulantFulfilled = (payload) => ({
  type: GET_ONE_POSTULANT_FULFILLED,
  payload
});
export const getOnePostulantRejected = (error) => ({
  type: GET_ONE_POSTULANT_REJECTED,
  payload: error
});

export const addPostulantFetching = () => ({
  type: ADD_POSTULANT_FETCHING
});
export const addPostulantFulfilled = (payload) => ({
  type: ADD_POSTULANT_FULFILLED,
  payload
});
export const addPostulantRejected = (error) => ({
  type: ADD_POSTULANT_REJECTED,
  payload: error
});

export const updatePostulantFetching = () => ({
  type: UPDATE_POSTULANT_FETCHING
});
export const updatePostulantFulfilled = (payload) => ({
  type: UPDATE_POSTULANT_FULFILLED,
  payload
});
export const updatePostulantRejected = (error) => ({
  type: UPDATE_POSTULANT_REJECTED,
  payload: error
});

export const deletePostulantFetching = () => ({
  type: DELETE_POSTULANT_FETCHING
});
export const deletePostulantFulfilled = (id) => ({
  type: DELETE_POSTULANT_FULFILLED,
  payload: id
});
export const deletePostulantRejected = (error) => ({
  type: DELETE_POSTULANT_REJECTED,
  payload: error
});

export const errorToDefault = () => ({
  type: ERROR_TO_DEFAULT
});
