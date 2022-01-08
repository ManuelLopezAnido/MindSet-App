import {
  getInterviewsFetching,
  getInterviewsFulfilled,
  getInterviewsRejected,
  getOneInterviewFetching,
  getOneInterviewFulfilled,
  getOneInterviewRejected,
  deleteInterviewFetching,
  deleteInterviewFulfilled,
  deleteInterviewRejected
} from './actions';
const URL = process.env.REACT_APP_API;

export const getInterviews = () => (dispatch) => {
  dispatch(getInterviewsFetching());
  fetch(`${URL}/interviews/`)
    .then((data) => data.json())
    .then((response) => dispatch(getInterviewsFulfilled(response)))
    .catch((error) => {
      dispatch(getInterviewsRejected(error.toString()));
    });
};
export const getOneInterview = (id) => (dispatch) => {
  dispatch(getOneInterviewFetching());
  return fetch(`${URL}/interviws/id/${id}`)
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
export const deleteInterview = (id) => (dispatch) => {
  dispatch(deleteInterviewFetching());
  const body = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  };
  fetch(`${URL}/interviews/delete/${id}`, body)
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      }
      dispatch(deleteInterviewFulfilled(id));
    })
    .catch((error) => {
      dispatch(deleteInterviewRejected(error.statusText));
    });
};
