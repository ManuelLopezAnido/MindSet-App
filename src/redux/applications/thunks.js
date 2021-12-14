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
      console.log('The URL is: ', `${URL}applications/`);
      dispatch(getApplicationsFulfilled(response.data));
    })
    .catch((error) => {
      console.log('The error form server in thunks is: ', error.toString());
      dispatch(getApplicationsRejected(error.toString()));
    });
};

export const getOneApplication = (id) => (dispatch) => {
  dispatch(getOneApplicationFetching());
  fetch(`${URL}/applications/id/${id}`)
    .then((response) => {
      if (response.status != 200) throw response;
      return response.json();
      // console.log('The One application is: ', response);
    })
    .then((response) => {
      console.log('The One application is: ', response);
      dispatch(getOneApplicationFulfilled(response));
    })
    .catch((error) => {
      console.log('The error on application is: ', error.statusText);
      console.log('The URL is: ', `${URL}applications/id/${id}`);
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
      positionId: data.position,
      companyId: data.company,
      postulantId: data.postulant,
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
      console.log('Error in ADDING: ', error);
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
      positionId: data.position,
      companyId: data.company,
      postulantId: data.postulant,
      applicationState: data.applicationState
    })
  })
    .then((data) => {
      if (data.status != 201) throw data.statusText;
      return data.json();
    })
    .then((response) => {
      console.log('UPDATED application response: ', response);
      dispatch(updateApplicationFulfilled(response));
      return response;
    })
    .catch((error) => {
      console.log('added application error: ', error);
      dispatch(updateApplicationRejected(error));
    });
};