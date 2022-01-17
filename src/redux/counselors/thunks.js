import {
  getCounselorsFetching,
  getCounselorsFulfilled,
  getCounselorsRejected,
  getOneCounselorFetching,
  getOneCounselorFulfilled,
  getOneCounselorRejected,
  addCounselorFetching,
  addCounselorFulfilled,
  addCounselorRejected,
  updateCounselorFetching,
  updateCounselorFulfilled,
  updateCounselorRejected,
  deleteCounselorFetching,
  deleteCounselorFulfilled,
  deleteCounselorRejected
} from './actions';

const URL = process.env.REACT_APP_API;

export const getCounselors = () => (dispatch) => {
  const token = sessionStorage.getItem('token');
  dispatch(getCounselorsFetching());
  return fetch(`${URL}/counselors/`, { headers: { token } })
    .then((data) => data.json())
    .then((response) => dispatch(getCounselorsFulfilled(response)))
    .catch((error) => dispatch(getCounselorsRejected(error)));
};

export const getOneCounselor = (id) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  dispatch(getOneCounselorFetching());
  return fetch(`${URL}/counselors/id/${id}`, { headers: { token } })
    .then((response) => {
      if (response.status != 200) throw response.message;
      return response.json();
    })
    .then((response) => {
      dispatch(getOneCounselorFulfilled(response));
      return response;
    })
    .catch((error) => {
      dispatch(getOneCounselorRejected(error));
      return error;
    });
};

export const addCounselor = (data) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      token
    },
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      gender: data.gender,
      address: data.address,
      birthday: data.birthday,
      city: data.city,
      country: data.country,
      phone: data.phone
    })
  };

  dispatch(addCounselorFetching());

  return fetch(`${URL}/counselors/add`, options)
    .then((data) => {
      if (data.status !== 200) {
        return data.json().then(({ message }) => {
          throw message;
        });
      }
      return data.json();
    })
    .then((response) => {
      dispatch(addCounselorFulfilled(response));
      return response;
    })
    .catch((error) => {
      dispatch(addCounselorRejected(error));
      return error;
    });
};

export const updateCounselor = (id, data) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  dispatch(updateCounselorFetching());
  return fetch(`${URL}/counselors/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      token
    },
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      gender: data.gender,
      address: data.address,
      birthday: data.birthday,
      city: data.city,
      country: data.country,
      phone: data.phone
    })
  })
    .then((data) => {
      if (data.status != 200) throw data.statusText;
      return data.json();
    })
    .then((response) => {
      dispatch(updateCounselorFulfilled(response));
      return response;
    })
    .catch((error) => {
      dispatch(updateCounselorRejected(error));
    });
};

export const deleteCounselor = (id) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  dispatch(deleteCounselorFetching());
  return fetch(`${URL}/counselors/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      token
    }
  })
    .then((response) => {
      if (response.status != 200) throw response;
      dispatch(deleteCounselorFulfilled(id));
    })
    .catch((error) => dispatch(deleteCounselorRejected(error.statusText)));
};
