import {
  getInterviewsFetching,
  getInterviewsFulfilled,
  getInterviewsRejected,
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
