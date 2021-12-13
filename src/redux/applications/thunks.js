import {
  getApplicationsFetching,
  getApplicationsFulfilled,
  getApplicationsRejected,
  getOneApplicationFetching,
  getOneApplicationFulfilled,
  getOneApplicationRejected,
  addApplicationFetching,
  addApplicationFulfilled,
  addApplicationRejected,
  updateApplicationFetching,
  updateApplicationFulfilled,
  updateApplicationRejected,
  deleteApplicationFetching,
  deleteApplicationFulfilled,
  deleteApplicationRejected
} from './actions';

const URL = process.env.REACT_APP_API;

export const getApplications = () => (dispatch) => {
  dispatch(getApplicationsFetching());
  fetch(`${URL}/applications`)
    .then((data) => data.json())
    .then((response) => {
      console.log('The response form server in thunks is: ', response.data);
      dispatch(getApplicationsFulfilled(response.data));
    })
    .catch((error) => {
      console.log('The error form server in thunks is: ', error.toString());
      dispatch(getApplicationsRejected(error.toString()));
    });
};

export const getOneApplication = (id) => (dispatch) => {
  dispatch(getOneApplicationFetching());
  return fetch(`${URL}/applications/${id}`)
    .then((response) => {
      if (response.status != 200) throw response.message;
      return response.json();
    })
    .then((response) => {
      dispatch(getOneApplicationFulfilled(response));
      return response;
    })
    .catch((error) => {
      dispatch(getOneApplicationRejected(error));
      return error;
    });
};

export const addApplication = (data) => (dispatch) => {
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

  dispatch(addApplicationFetching());

  return fetch(`${URL}/applications/create`, options)
    .then((data) => {
      if (data.status !== 201) {
        return data.json().then(({ message }) => {
          throw message;
        });
      }
      return data.json();
    })
    .then((response) => {
      dispatch(addApplicationFulfilled(response));
      return response;
    })
    .catch((error) => {
      dispatch(addApplicationRejected(error));
      return error;
    });
};

export const updateApplication = (id, data) => (dispatch) => {
  dispatch(updateApplicationFetching());
  return fetch(`${URL}/applications/update/${id}`, {
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
      dispatch(updateApplicationFulfilled(response));
      return response;
    })
    .catch((error) => dispatch(updateApplicationRejected(error)));
};

export const deleteApplication = (id) => (dispatch) => {
  dispatch(deleteApplicationFetching());
  return fetch(`${URL}/applications/delete/${id + 1}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then((response) => {
      if (response.status != 200) throw response;
      dispatch(deleteApplicationFulfilled(id));
    })
    .catch((error) => dispatch(deleteApplicationRejected(error.statusText)));
};
