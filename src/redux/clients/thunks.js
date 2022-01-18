import {
  getClientsFetching,
  getClientsFulfilled,
  getClientsRejected,
  getOneClientFetching,
  getOneClientFulfilled,
  getOneClientRejected,
  addClientFetching,
  addClientFulfilled,
  addClientRejected,
  updateClientFetching,
  updateClientFulfilled,
  updateClientRejected,
  deleteClientFetching,
  deleteClientFulfilled,
  deleteClientRejected
} from './actions';

const URL = process.env.REACT_APP_API;

export const getClients = () => (dispatch) => {
  const token = sessionStorage.getItem('token');
  dispatch(getClientsFetching());
  return fetch(`${URL}/clients/`, { headers: { token } })
    .then((response) => {
      if (response.status !== 200) {
        return response.json().then((response) => {
          throw response;
        });
      }
      return response.json();
    })
    .then((response) => dispatch(getClientsFulfilled(response)))
    .catch((error) => {
      dispatch(getClientsRejected(error.message));
    });
};

export const getOneClient = (id) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  dispatch(getOneClientFetching());
  return fetch(`${URL}/clients/id/${id}`, { headers: token })
    .then((response) => {
      if (response.status != 200) throw response.message;
      return response.json();
    })
    .then((response) => {
      dispatch(getOneClientFulfilled(response));
      return response;
    })
    .catch((error) => {
      dispatch(getOneClientRejected(error));
      return error;
    });
};

export const addClient = (data) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    body: JSON.stringify({
      clientName: data.clientName,
      clientType: data.clientType,
      city: data.city,
      country: data.country,
      email: data.email,
      phone: data.phone,
      openPositions: data.openPositions
    })
  };

  dispatch(addClientFetching());
  return fetch(`${URL}/clients/add`, options)
    .then((data) => {
      if (data.status !== 200) {
        return data.json().then((error) => {
          throw error;
        });
      }
      return data.json();
    })
    .then((response) => {
      dispatch(addClientFulfilled(response));
      return response;
    })
    .catch((error) => {
      dispatch(addClientRejected(error));
      return error;
    });
};

export const updateClient = (id, data) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  dispatch(updateClientFetching());
  return fetch(`${URL}/clients/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    body: JSON.stringify({
      clientName: data.clientName,
      clientType: data.clientType,
      city: data.city,
      country: data.country,
      email: data.email,
      phone: data.phone,
      openPositions: data.openPositions
    })
  })
    .then((data) => {
      if (data.status >= 400) throw data.statusText;
      return data.json();
    })
    .then((response) => {
      dispatch(updateClientFulfilled(response));
      return response;
    })
    .catch((error) => {
      dispatch(updateClientRejected(error));
      return error;
    });
};

export const deleteClient = (id) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  dispatch(deleteClientFetching());
  return fetch(`${URL}/clients/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      token
    }
  })
    .then((response) => {
      if (response.status >= 400) throw response;
      dispatch(deleteClientFulfilled(id));
    })
    .catch((error) => {
      dispatch(deleteClientRejected(error.statusText));
      return error;
    });
};
