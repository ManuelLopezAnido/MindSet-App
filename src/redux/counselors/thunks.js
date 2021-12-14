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
  dispatch(getCounselorsFetching());
  fetch(`${URL}/counselors/`)
    .then((data) => data.json())
    .then((response) => dispatch(getCounselorsFulfilled(response)))
    .catch((error) => dispatch(getCounselorsRejected(error)));
};

export const getOneCounselor = (id) => (dispatch) => {
  dispatch(getOneCounselorFetching());
  return fetch(`${URL}/counselors/id/${id}`)
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
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      gender: data.gender,
      adress: data.address,
      birthday: data.birthday,
      city: data.city,
      country: data.country,
      phone: data.phone,
      availability: {
        monday: {
          availability: data.monday,
          from: data.mondayFrom,
          to: data.mondayTo
        },
        tuesday: {
          availability: data.tuesday,
          from: data.tuesdayFrom,
          to: data.tuesdayTo
        },
        wednesday: {
          availability: data.wednesday,
          from: data.wednesdayFrom,
          to: data.wednesdayTo
        },
        thursday: {
          availability: data.thursday,
          from: data.thursdayFrom,
          to: data.thursdayTo
        },
        friday: {
          availability: data.friday,
          from: data.fridayFrom,
          to: data.fridayTo
        }
      }
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
  dispatch(updateCounselorFetching());
  return fetch(`${URL}/counselors/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      gender: data.gender,
      adress: data.adress,
      birthday: data.birthday,
      city: data.city,
      country: data.country,
      phone: data.phone,
      availability: {
        monday: {
          availability: data.monday,
          from: data.mondayFrom,
          to: data.mondayTo
        },
        tuesday: {
          availability: data.tuesday,
          from: data.tuesdayFrom,
          to: data.tuesdayTo
        },
        wednesday: {
          availability: data.wednesday,
          from: data.wednesdayFrom,
          to: data.wednesdayTo
        },
        thursday: {
          availability: data.thursday,
          from: data.thursdayFrom,
          to: data.thursdayTo
        },
        friday: {
          availability: data.friday,
          from: data.fridayFrom,
          to: data.fridayTo
        }
      }
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
    .catch((error) => dispatch(updateCounselorRejected(error)));
};

export const deleteCounselor = (id) => (dispatch) => {
  dispatch(deleteCounselorFetching());
  return fetch(`${URL}/counselors/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then((response) => {
      if (response.status != 200) throw response;
      dispatch(deleteCounselorFulfilled(id));
    })
    .catch((error) => dispatch(deleteCounselorRejected(error.statusText)));
};
