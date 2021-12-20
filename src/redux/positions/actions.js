import {
  GET_POSITIONS_FETCHING,
  GET_POSITIONS_FULFILLED,
  GET_POSITIONS_REJECTED,
  GET_ONE_POSITION_FETCHING,
  GET_ONE_POSITION_FULFILLED,
  GET_ONE_POSITION_REJECTED,
  ADD_POSITION_FETCHING,
  ADD_POSITION_FULFILLED,
  ADD_POSITION_REJECTED,
  UPDATE_POSITION_FETCHING,
  UPDATE_POSITION_FULFILLED,
  UPDATE_POSITION_REJECTED,
  DELETE_POSITION_FETCHING,
  DELETE_POSITION_FULFILLED,
  DELETE_POSITION_REJECTED,
  ERROR_TO_DEFAULT
} from './constants';

export const getPositionsFetching = () => {
  return { type: GET_POSITIONS_FETCHING };
};
export const getPositionsFulfilled = (payload) => ({
  type: GET_POSITIONS_FULFILLED,
  payload
});
export const getPositionsRejected = (error) => ({
  type: GET_POSITIONS_REJECTED,
  payload: error
});

export const getOnePositionFetching = () => ({
  type: GET_ONE_POSITION_FETCHING
});
export const getOnePositionFulfilled = (payload) => ({
  type: GET_ONE_POSITION_FULFILLED,
  payload
});
export const getOnePositionRejected = (error) => ({
  type: GET_ONE_POSITION_REJECTED,
  payload: error
});

export const addPositionFetching = () => ({
  type: ADD_POSITION_FETCHING
});
export const addPositionFulfilled = (payload) => ({
  type: ADD_POSITION_FULFILLED,
  payload
});
export const addPositionRejected = (error) => ({
  type: ADD_POSITION_REJECTED,
  payload: error
});

export const updatePositionFetching = () => ({
  type: UPDATE_POSITION_FETCHING
});
export const updatePositionFulfilled = (payload) => ({
  type: UPDATE_POSITION_FULFILLED,
  payload
});
export const updatePositionRejected = (error) => ({
  type: UPDATE_POSITION_REJECTED,
  payload: error
});

export const deletePositionFetching = () => ({
  type: DELETE_POSITION_FETCHING
});
export const deletePositionFulfilled = (id) => ({
  type: DELETE_POSITION_FULFILLED,
  payload: id
});
export const deletePositionRejected = (error) => ({
  type: DELETE_POSITION_REJECTED,
  payload: error
});

export const errorToDefault = () => ({
  type: ERROR_TO_DEFAULT
});
