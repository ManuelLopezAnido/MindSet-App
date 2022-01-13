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
  const token = sessionStorage.getItem('token');
  dispatch(getAdminsFetching());
  fetch(`${URL}/admins/`, { headers: { token } })
    .then((data) => data.json())
    .then((response) => dispatch(getAdminsFulfilled(response)))
    .catch((error) => dispatch(getAdminsRejected(error)));
};

export const getOneAdmin = (id) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  dispatch(getOneAdminFetching());
  return fetch(`${URL}/admins/${id}`, { headers: { token } })
    .then((response) => {
      if (response.status != 200) throw response.message;
      return response.json();
    })
    .then((response) => {
      dispatch(getOneAdminFulfilled(response));
      return response;
    })
    .catch((error) => {
      dispatch(getOneAdminRejected(error));
      return error;
    });
};

export const addAdmin = (data) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      token
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password
    })
  };

  dispatch(addAdminFetching());

  return fetch(`${URL}/register/admin`, options)
    .then((data) => {
      console.log(options);
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
  const token = sessionStorage.getItem('token');
  dispatch(updateAdminFetching());
  return fetch(`${URL}/admins/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      token
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
  const token = sessionStorage.getItem('token');
  dispatch(deleteAdminFetching());
  return fetch(`${URL}/admins/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      token
    }
  })
    .then((response) => {
      if (response.status != 200) throw response;
      dispatch(deleteAdminFulfilled(id));
    })
    .catch((error) => dispatch(deleteAdminRejected(error.statusText)));
};
