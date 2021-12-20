import { getPositionsFetching, getPositionsFulfilled, getPositionsRejected } from './actions';
const URL = process.env.REACT_APP_API;

export const getPositions = () => (dispatch) => {
  dispatch(getPositionsFetching());
  fetch(`${URL}/positions/`)
    .then((data) => data.json())
    .then((response) => dispatch(getPositionsFulfilled(response)))
    .catch((error) => {
      dispatch(getPositionsRejected(error.toString()));
    });
};
