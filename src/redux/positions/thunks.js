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
  const token = sessionStorage.getItem('token');
  dispatch(getPositionsFetching());
  return fetch(`${URL}/positions/`, { headers: { token } })
    .then((data) => data.json())
    .then((response) => dispatch(getPositionsFulfilled(response)))
    .catch((error) => {
      dispatch(getPositionsRejected(error.toString()));
    });
};

export const getOnePosition = (id) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  dispatch(getOnePositionFetching());
  fetch(`${URL}/positions/id/${id}`, { headers: { token } })
    .then((response) => {
      if (response.status != 200) throw response;
      return response.json();
    })
    .then((response) => {
      dispatch(getOnePositionFulfilled(response));
    })
    .catch((error) => {
      dispatch(getOnePositionRejected(error.statusText));
    });
};

export const addPosition = (data) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      token
    },
    body: JSON.stringify({
      jobTitle: data.jobTitle,
      clientName: data.clientName,
      jobDescription: data.jobDescription,
      city: data.city,
      country: data.country,
      datePosted: data.datePosted,
      closingDate: data.closingDate,
      profile: data.profile
    })
  };
  dispatch(addPositionFetching());

  return fetch(`${URL}/positions/create`, options)
    .then((data) => {
      if (data.status != 201) throw data;
      return data.json();
    })
    .then((response) => {
      return dispatch(addPositionFulfilled(response));
    })
    .catch((error) => {
      dispatch(addPositionRejected(error.statusText));
    });
};

export const updatePosition = (id, data) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  dispatch(updatePositionFetching());
  return fetch(`${URL}/positions/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      token
    },
    body: JSON.stringify({
      jobTitle: data.jobTitle,
      clientName: data.clientName,
      jobDescription: data.jobDescription,
      city: data.city,
      country: data.country,
      datePosted: data.datePosted,
      closingDate: data.closingDate,
      profile: data.profile
    })
  })
    .then((data) => {
      if (data.status != 200) throw data.statusText;
      return data.json();
    })
    .then((response) => {
      return dispatch(updatePositionFulfilled(response));
    })
    .catch((error) => {
      dispatch(updatePositionRejected(error));
    });
};

export const deletePosition = (id) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  dispatch(deletePositionFetching());
  fetch(`${URL}/positions/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      token
    }
  })
    .then((response) => {
      if (response.status !== 201) {
        return response.json().then(({ message }) => {
          throw message;
        });
      }
      dispatch(deletePositionFulfilled(id));
    })
    .catch((error) => {
      dispatch(deletePositionRejected(error));
    });
};
