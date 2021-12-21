import { getInterviewsFetching, getInterviewsFulfilled, getInterviewsRejected } from './actions';
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
