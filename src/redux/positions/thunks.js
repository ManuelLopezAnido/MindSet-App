import {
  getPositionsFetching,
  getPositionsFulfilled,
  getPositionsRejected,
  getOnePositionFetching,
  getOnePositionFulfilled,
  getOnePositionRejected,
  addPositionFetching,
  addPositionFulfilled,
  addPositionRejected,
  updatePositionFetching,
  updatePositionFulfilled,
  updatePositionRejected,
  deletePositionFetching,
  deletePositionFulfilled,
  deletePositionRejected
} from './actions';

const URL = process.env.REACT_APP_API;

export const getPositions = () => (dispatch) => {
  dispatch(getPositionsFetching());
  fetch(`${URL}/positions/`)
    .then((data) => data.json())
    .then((response) => dispatch(getPositionsFulfilled(response)))
    .catch((error) => dispatch(getPositionsRejected(error)));
};

export const getOnePosition = (id) => (dispatch) => {
  dispatch(getOnePositionFetching());
  return fetch(`${URL}/positions/${id}`)
    .then((response) => {
      if (response.status != 200) throw response.message;
      return response.json();
    })
    .then((response) => {
      dispatch(getOnePositionFulfilled(response));
      return response;
    })
    .catch((error) => {
      dispatch(getOnePositionRejected(error));
      return error;
    });
};

export const addPosition = (data) => (dispatch) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password
    })
  };

  dispatch(addPositionFetching());

  return fetch(`${URL}/positions/create`, options)
    .then((data) => {
      if (data.status !== 201) {
        return data.json().then(({ message }) => {
          throw message;
        });
      }
      return data.json();
    })
    .then((response) => {
      dispatch(addPositionFulfilled(response));
      return response;
    })
    .catch((error) => {
      dispatch(addPositionRejected(error));
      return error;
    });
};

export const updatePosition = (id, data) => (dispatch) => {
  dispatch(updatePositionFetching());
  return fetch(`${URL}/positions/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password
    })
  })
    .then((data) => {
      if (data.status != 200) throw data.statusText;
      return data.json();
    })
    .then((response) => {
      dispatch(updatePositionFulfilled(response));
      return response;
    })
    .catch((error) => dispatch(updatePositionRejected(error)));
};

export const deletePosition = (id) => (dispatch) => {
  dispatch(deletePositionFetching());
  return fetch(`${URL}/positions/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then((response) => {
      if (response.status != 200) throw response;
      dispatch(deletePositionFulfilled(id));
    })
    .catch((error) => dispatch(deletePositionRejected(error.statusText)));
};
