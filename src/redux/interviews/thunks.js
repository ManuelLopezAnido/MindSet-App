import {
  getInterviewsFetching,
  getInterviewsFulfilled,
  getInterviewsRejected,
  getOneInterviewFetching,
  getOneInterviewFulfilled,
  getOneInterviewRejected,
  addInterviewFetching,
  addInterviewFulfilled,
  addInterviewRejected,
  updateInterviewFetching,
  updateInterviewFulfilled,
  updateInterviewRejected,
  deleteInterviewFetching,
  deleteInterviewFulfilled,
  deleteInterviewRejected
} from './actions';
const URL = process.env.REACT_APP_API;

export const getInterviews = () => (dispatch) => {
  const token = sessionStorage.getItem('token');
  dispatch(getInterviewsFetching());
  fetch(`${URL}/interviews/`, { headers: { token } })
    .then((data) => data.json())
    .then((response) => dispatch(getInterviewsFulfilled(response)))
    .catch((error) => {
      dispatch(getInterviewsRejected(error.toString()));
    });
};

export const getOneInterview = (id) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  dispatch(getOneInterviewFetching());
  return fetch(`${URL}/interviews/${id}`, { headers: { token } })
    .then((response) => {
      if (response.status != 200) throw response.message;
      return response.json();
    })
    .then((response) => {
      dispatch(getOneInterviewFulfilled(response));
      return response;
    })
    .catch((error) => {
      dispatch(getOneInterviewRejected(error));
      return error;
    });
};

export const addInterview = (data) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      token
    },
    body: JSON.stringify({
      jobTitle: data.jobTitle,
      postulantId: data.postulantId,
      clientId: data.clientId,
      date: data.date,
      time: data.time,
      state: data.state
    })
  };

  dispatch(addInterviewFetching());

  return fetch(`${URL}/interviews/create`, options)
    .then((data) => {
      if (data.status !== 201) {
        return data.json().then(({ message }) => {
          throw message;
        });
      }
      return data.json();
    })
    .then((response) => {
      dispatch(addInterviewFulfilled(response));
      return response;
    })
    .catch((error) => {
      dispatch(addInterviewRejected(error));
      return error;
    });
};

export const updateInterview = (id, data) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  dispatch(updateInterviewFetching());
  return fetch(`${URL}/interviews/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      token
    },
    body: JSON.stringify({
      jobTitle: data.jobTitle,
      postulantId: data.postulantId,
      clientId: data.clientId,
      date: data.date,
      time: data.time,
      state: data.state
    })
  })
    .then((data) => {
      if (data.status != 200) throw data.statusText;
      return data.json();
    })
    .then((response) => {
      dispatch(updateInterviewFulfilled(response));
      return response;
    })
    .catch((error) => dispatch(updateInterviewRejected(error)));
};

export const deleteInterview = (id) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  dispatch(deleteInterviewFetching());
  const body = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      token
    }
  };
  fetch(`${URL}/interviews/delete/${id}`, body)
    .then((response) => {
      if (response.status !== 201) {
        return response.json().then(({ message }) => {
          throw message;
        });
      }
      dispatch(deleteInterviewFulfilled(id));
    })
    .catch((error) => {
      dispatch(deleteInterviewRejected(error));
    });
};
