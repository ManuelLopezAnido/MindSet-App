import {
  getAdminsFetching,
  getAdminsFulfilled,
  getAdminsRejected,
  getOneAdminFetching,
  getOneAdminFulfilled,
  getOneAdminRejected,
  addAdminFetching,
  addAdminFulfilled,
  addAdminRejected,
  updateAdminFetching,
  updateAdminFulfilled,
  updateAdminRejected,
  deleteAdminFetching,
  deleteAdminFulfilled,
  deleteAdminRejected
} from './actions';

const URL = process.env.REACT_APP_API;

export const getAdmins = () => (dispatch) => {
  dispatch(getAdminsFetching());
  fetch(`${URL}/admins/`)
    .then((data) => data.json())
    .then((response) => dispatch(getAdminsFulfilled(response)))
    .catch((error) => dispatch(getAdminsRejected(error)));
};

export const getOneAdmin = (id) => (dispatch) => {
  dispatch(getOneAdminFetching());
  return fetch(`${URL}/admins/${id}`)
    .then((response) => {
      if (response.status != 200) throw response.message;
      return response.json();
    })
    .then((response) => {
      console.log('The One admin is: ', response.data);
      dispatch(getOneAdminFulfilled(response));
      return response;
    })
    .catch((error) => {
      dispatch(getOneAdminRejected(error));
      return error;
    });
};

export const addAdmin = (data) => (dispatch) => {
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

  dispatch(addAdminFetching());

  return fetch(`${URL}/admins/create`, options)
    .then((data) => {
      if (data.status !== 201) {
        return data.json().then(({ message }) => {
          throw message;
        });
      }
      return data.json();
    })
    .then((response) => {
      dispatch(addAdminFulfilled(response));
      return response;
    })
    .catch((error) => {
      dispatch(addAdminRejected(error));
      return error;
    });
};

export const updateAdmin = (id, data) => (dispatch) => {
  dispatch(updateAdminFetching());
  return fetch(`${URL}/admins/update/${id}`, {
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
      dispatch(updateAdminFulfilled(response));
      return response;
    })
    .catch((error) => dispatch(updateAdminRejected(error)));
};

export const deleteAdmin = (id) => (dispatch) => {
  dispatch(deleteAdminFetching());
  return fetch(`${URL}/admins/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then((response) => {
      if (response.status != 200) throw response;
      dispatch(deleteAdminFulfilled(id));
    })
    .catch((error) => dispatch(deleteAdminRejected(error.statusText)));
};
