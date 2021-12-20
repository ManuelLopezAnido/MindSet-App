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
      dispatch(getApplicationsFulfilled(response.data));
    })
    .catch((error) => {
      dispatch(getApplicationsRejected(error.toString()));
    });
};

export const getOneApplication = (id) => (dispatch) => {
  dispatch(getOneApplicationFetching());
  fetch(`${URL}/applications/id/${id}`)
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
  dispatch(deleteApplicationFetching());
  return fetch(`${URL}/applications/delete/${id}`, {
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

export const addApplication = (data) => (dispatch) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      positionId: data.positionId,
      companyId: data.companyId,
      postulantId: data.postulantId,
      applicationState: data.state
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
  dispatch(updateApplicationFetching());

  return fetch(`${URL}/applications/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      positionId: data.positionId,
      companyId: data.companyId,
      postulantId: data.postulantId,
      applicationState: data.state
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
