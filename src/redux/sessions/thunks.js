import {
  getSessionsFetching,
  getSessionsFulfilled,
  getSessionsRejected,
  getOneSessionFetching,
  getOneSessionFulfilled,
  getOneSessionRejected,
  addSessionFetching,
  addSessionFulfilled,
  addSessionRejected,
  updateSessionFetching,
  updateSessionFulfilled,
  updateSessionRejected,
  deleteSessionFetching,
  deleteSessionFulfilled,
  deleteSessionRejected
} from './actions';

const URL = process.env.REACT_APP_API;

export const getSessions = () => (dispatch) => {
  dispatch(getSessionsFetching());
  fetch(`${URL}/sessions/`)
    .then((data) => data.json())
    .then((response) => dispatch(getSessionsFulfilled(response)))
    .catch((error) => dispatch(getSessionsRejected(error)));
};

export const getOneSession = (id) => (dispatch) => {
  dispatch(getOneSessionFetching());
  return fetch(`${URL}/sessions/${id}`)
    .then((response) => {
      if (response.status != 200) throw response.message;
      return response.json();
    })
    .then((response) => {
      dispatch(getOneSessionFulfilled(response));
      return response;
    })
    .catch((error) => {
      dispatch(getOneSessionRejected(error));
      return error;
    });
};

export const addSession = (values) => (dispatch) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(values)
  };

  dispatch(addSessionFetching());

  return fetch(`${URL}/sessions/create`, options)
    .then((data) => {
      if (data.status !== 201) {
        return data.json().then(({ message }) => {
          throw message;
        });
      }
      return data.json();
    })
    .then((response) => {
      dispatch(addSessionFulfilled(response));
      return response;
    })
    .catch((error) => {
      dispatch(addSessionRejected(error));
      return error;
    });
};

export const updateSession = (id, values) => (dispatch) => {
  dispatch(updateSessionFetching());
  return fetch(`${URL}/sessions/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(values)
  })
    .then((data) => {
      if (data.status != 200) throw data.statusText;
      return data.json();
    })
    .then((response) => {
      dispatch(updateSessionFulfilled(response));
      return response;
    })
    .catch((error) => dispatch(updateSessionRejected(error)));
};

export const deleteSession = (id) => (dispatch) => {
  dispatch(deleteSessionFetching());
  return fetch(`${URL}/sessions/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then((response) => {
      if (response.status != 200) throw response;
      dispatch(deleteSessionFulfilled(id));
    })
    .catch((error) => dispatch(deleteSessionRejected(error.statusText)));
};
