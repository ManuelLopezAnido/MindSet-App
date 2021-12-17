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
    .catch((error) => {
      console.log('Error is:', error.toString());
      dispatch(getPositionsRejected(error.toString()));
    });
};

export const getOnePosition = (id) => (dispatch) => {
  dispatch(getOnePositionFetching());
  fetch(`${URL}/positions/id/${id}`)
    .then((response) => {
      if (response.status != 200) throw response;
      return response.json();
    })
    .then((response) => {
      {
        console.log('the fullflied position is: ', response);
      }
      dispatch(getOnePositionFulfilled(response));
    })
    .catch((error) => {
      dispatch(getOnePositionRejected(error.statusText));
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
  return fetch(`${URL}positions/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((data) => {
      if (data.status != 200) throw data.statusText;
      return data.json();
    })
    .then((response) => {
      return dispatch(updatePositionFulfilled(response));
    })
    .catch((error) => dispatch(updatePositionRejected(error)));
};

export const deletePosition = (id) => (dispatch) => {
  dispatch(deletePositionFetching());
  fetch(`${URL}/positions/delete/${id + 1}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then((response) => {
      if (response.status != 200) throw response;
      dispatch(deletePositionFulfilled(id));
    })
    .catch((error) => {
      console.log('error is:', error);
      dispatch(deletePositionRejected(error.statusText));
    });
};
