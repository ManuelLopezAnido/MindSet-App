import {
  getProfilesFetching,
  getProfilesFulfilled,
  getProfilesRejected,
  getOneProfileFetching,
  getOneProfileFulfilled,
  getOneProfileRejected,
  addProfileFetching,
  addProfileFulfilled,
  addProfileRejected,
  updateProfileFetching,
  updateProfileFulfilled,
  updateProfileRejected,
  deleteProfileFetching,
  deleteProfileFulfilled,
  deleteProfileRejected
} from './actions';

const URL = process.env.REACT_APP_API;

export const getProfiles = () => (dispatch) => {
  const token = sessionStorage.getItem('token');
  dispatch(getProfilesFetching());
  fetch(`${URL}/workProfiles/`, { headers: { token } })
    .then((data) => data.json())
    .then((response) => dispatch(getProfilesFulfilled(response)))
    .catch((error) => dispatch(getProfilesRejected(error)));
};

export const getOneProfile = (id) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  dispatch(getOneProfileFetching());
  return fetch(`${URL}/workProfiles/${id}`, { headers: { token } })
    .then((response) => {
      if (response.status != 200) throw response.message;
      return response.json();
    })
    .then((response) => {
      dispatch(getOneProfileFulfilled(response));
      return response;
    })
    .catch((error) => {
      dispatch(getOneProfileRejected(error));
      return error;
    });
};

export const addProfile = (data) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      token
    },
    body: JSON.stringify({
      name: data.name,
      description: data.description
    })
  };

  dispatch(addProfileFetching());

  return fetch(`${URL}/workProfiles/create`, options)
    .then((data) => {
      if (data.status !== 201) {
        return data.json().then(({ message }) => {
          throw message;
        });
      }
      return data.json();
    })
    .then((response) => {
      dispatch(addProfileFulfilled(response));
      return response;
    })
    .catch((error) => {
      dispatch(addProfileRejected(error));
      return error;
    });
};

export const updateProfile = (id, data) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  dispatch(updateProfileFetching());
  return fetch(`${URL}/workProfiles/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      token
    },
    body: JSON.stringify({
      name: data.name,
      description: data.description
    })
  })
    .then((data) => {
      if (data.status != 200) throw data.statusText;
      return data.json();
    })
    .then((response) => {
      dispatch(updateProfileFulfilled(response));
      return response;
    })
    .catch((error) => dispatch(updateProfileRejected(error)));
};

export const deleteProfile = (id) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  dispatch(deleteProfileFetching());
  return fetch(`${URL}/workProfiles/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      token
    }
  })
    .then((response) => {
      if (response.status != 200) throw response;
      dispatch(deleteProfileFulfilled(id));
    })
    .catch((error) => dispatch(deleteProfileRejected(error.statusText)));
};
