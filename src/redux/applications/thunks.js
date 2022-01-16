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
  const token = sessionStorage.getItem('token');
  dispatch(getApplicationsFetching());
  fetch(`${URL}/applications`, { headers: { token } })
    .then((response) => {
      if (response.status !== 200) {
        return response.json().then((response) => {
          throw response;
        });
      }
      return response.json();
    })
    .then((response) => {
      dispatch(getApplicationsFulfilled(response.data));
    })
    .catch((error) => {
      console.log('error', error);
      dispatch(getApplicationsRejected(error.message.code));
    });
};

export const getOneApplication = (id) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  dispatch(getOneApplicationFetching());
  fetch(`${URL}/applications/id/${id}`, { headers: { token } })
    .then((response) => {
      if (response.status != 200) throw response;
      return response.json();
    })
    .then((response) => {
      dispatch(getOneApplicationFulfilled(response));
    })
    .catch((error) => {
      dispatch(getOneApplicationRejected(error.statusText));
    });
};

export const deleteApplication = (id) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  dispatch(deleteApplicationFetching());
  return fetch(`${URL}/applications/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      token
    }
  })
    .then((response) => {
      if (response.status != 200) throw response;
      dispatch(deleteApplicationFulfilled(id));
    })
    .catch((error) => dispatch(deleteApplicationRejected(error.statusText)));
};

export const addApplication = (data) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      token
    },
    body: JSON.stringify({
      positionId: data.positionId,
      clientId: data.clientId,
      postulantId: data.postulantId,
      applicationState: data.applicationState
    })
  };

  dispatch(addApplicationFetching());

  return fetch(`${URL}/applications/add`, options)
    .then((data) => {
      if (data.status !== 200) {
        return data.json().then((errMessage) => {
          throw errMessage;
        });
      }
      return data.json();
    })
    .then((response) => {
      dispatch(addApplicationFulfilled(response.data));
      return response;
    })
    .catch((error) => {
      dispatch(addApplicationRejected(error));
      return error;
    });
};

export const updateApplication = (id, data) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  dispatch(updateApplicationFetching());
  return fetch(`${URL}/applications/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      token
    },
    body: JSON.stringify({
      positionId: data.positionId,
      clientId: data.clientId,
      postulantId: data.postulantId,
      applicationState: data.applicationState
    })
  })
    .then((data) => {
      if (data.status != 201) throw data.statusText;
      return data.json();
    })
    .then((response) => {
      dispatch(updateApplicationFulfilled(response));
      return response;
    })
    .catch((error) => {
      dispatch(updateApplicationRejected(error));
    });
};
