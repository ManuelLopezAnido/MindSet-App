import {
  GET_CLIENTS_FETCHING,
  GET_CLIENTS_FULFILLED,
  GET_CLIENTS_REJECTED,
  GET_ONE_CLIENT_FETCHING,
  GET_ONE_CLIENT_FULFILLED,
  GET_ONE_CLIENT_REJECTED,
  ADD_CLIENT_FETCHING,
  ADD_CLIENT_FULFILLED,
  ADD_CLIENT_REJECTED,
  UPDATE_CLIENT_FETCHING,
  UPDATE_CLIENT_FULFILLED,
  UPDATE_CLIENT_REJECTED,
  DELETE_CLIENT_FETCHING,
  DELETE_CLIENT_FULFILLED,
  DELETE_CLIENT_REJECTED,
  ERROR_TO_DEFAULT
} from './constants';

const initialState = {
  isLoading: false,
  list: [],
  error: false,
  errorMessage: '',
  selected: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLIENTS_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case GET_CLIENTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: action.payload.data
      };
    case GET_CLIENTS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true
      };

    case GET_ONE_CLIENT_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case GET_ONE_CLIENT_FULFILLED:
      return {
        ...state,
        selected: action.payload,
        isLoading: false
      };
    case GET_ONE_CLIENT_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload
      };

    case ADD_CLIENT_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case ADD_CLIENT_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload.data]
      };
    case ADD_CLIENT_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true
      };

    case UPDATE_CLIENT_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case UPDATE_CLIENT_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list]
      };
    case UPDATE_CLIENT_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload
      };

    case DELETE_CLIENT_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case DELETE_CLIENT_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((client) => client._id !== action.payload)
      };
    case DELETE_CLIENT_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload
      };

    case ERROR_TO_DEFAULT: {
      return {
        ...state,
        error: false
      };
    }
    default:
      return state;
  }
};

export default reducer;
