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
  fetch(`${URL}/admins/id/${id}`)
    .then((data) => data.json())
    .then((response) => dispatch(getOneAdminFulfilled(response)))
    .catch((error) => dispatch(getOneAdminRejected(error)));
};

export const addAdmin = (data) => (dispatch) => {
  dispatch(addAdminFetching());
  fetch(`${URL}/admins/create`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      email: data.emailValue,
      password: data.passwordValue
    })
  })
    .then((data) => data.json())
    .then((response) => dispatch(addAdminFulfilled(response)))
    .catch((error) => dispatch(addAdminRejected(error)));
};

export const updateAdmin = (id, data) => (dispatch) => {
  dispatch(updateAdminFetching());
  fetch(`${URL}/admins/update${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      email: data.emailValue,
      password: data.passwordValue
    })
  })
    .then((data) => data.json())
    .then((response) => dispatch(updateAdminFulfilled(response)))
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
    .then((data) => data.json())
    .then(() => {
      dispatch(deleteAdminFulfilled(id));
    })
    .catch((error) => {
      console.log('entre al catch del thunk delete');
      dispatch(deleteAdminRejected(error));
    });
};
