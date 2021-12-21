import {
  GET_SESSIONS_FETCHING,
  GET_SESSIONS_FULFILLED,
  GET_SESSIONS_REJECTED,
  GET_ONE_SESSION_FETCHING,
  GET_ONE_SESSION_FULFILLED,
  GET_ONE_SESSION_REJECTED,
  ADD_SESSION_FETCHING,
  ADD_SESSION_FULFILLED,
  ADD_SESSION_REJECTED,
  UPDATE_SESSION_FETCHING,
  UPDATE_SESSION_FULFILLED,
  UPDATE_SESSION_REJECTED,
  DELETE_SESSION_FETCHING,
  DELETE_SESSION_FULFILLED,
  DELETE_SESSION_REJECTED,
  ERROR_TO_DEFAULT,
  SELECTED_TO_DEFAULT
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
    case GET_SESSIONS_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case GET_SESSIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: action.payload.Sessions
      };
    case GET_SESSIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true
      };

    case GET_ONE_SESSION_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case GET_ONE_SESSION_FULFILLED:
      return {
        ...state,
        selected: action.payload.data,
        isLoading: false
      };
    case GET_ONE_SESSION_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload
      };

    case ADD_SESSION_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case ADD_SESSION_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload]
      };
    case ADD_SESSION_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true
      };

    case UPDATE_SESSION_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case UPDATE_SESSION_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list]
      };
    case UPDATE_SESSION_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload
      };

    case DELETE_SESSION_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case DELETE_SESSION_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((session) => session._id !== action.payload)
      };
    case DELETE_SESSION_REJECTED:
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
    case SELECTED_TO_DEFAULT: {
      return {
        ...state,
        selected: {}
      };
    }
    default:
      return state;
  }
};

export default reducer;
