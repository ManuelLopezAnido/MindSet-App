import {
  GET_APPLICATIONS_FETCHING,
  GET_APPLICATIONS_FULFILLED,
  GET_APPLICATIONS_REJECTED,
  GET_ONE_APPLICATION_FETCHING,
  GET_ONE_APPLICATION_FULFILLED,
  GET_ONE_APPLICATION_REJECTED,
  ADD_APPLICATION_FETCHING,
  ADD_APPLICATION_FULFILLED,
  ADD_APPLICATION_REJECTED,
  UPDATE_APPLICATION_FETCHING,
  UPDATE_APPLICATION_FULFILLED,
  UPDATE_APPLICATION_REJECTED,
  DELETE_APPLICATION_FETCHING,
  DELETE_APPLICATION_FULFILLED,
  DELETE_APPLICATION_REJECTED,
  ERROR_TO_DEFAULT,
  SELECTED_TO_DEFAULT
} from './constants';

const initialState = {
  isLoading: false,
  list: [],
  error: '',
  selected: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APPLICATIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_APPLICATIONS_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    }
    case GET_APPLICATIONS_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    }
    case GET_ONE_APPLICATION_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case GET_ONE_APPLICATION_FULFILLED:
      return {
        ...state,
        selected: action.payload,
        isLoading: false
      };
    case GET_ONE_APPLICATION_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case ADD_APPLICATION_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case ADD_APPLICATION_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload]
      };
    case ADD_APPLICATION_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case UPDATE_APPLICATION_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case UPDATE_APPLICATION_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list]
      };
    case UPDATE_APPLICATION_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case DELETE_APPLICATION_FETCHING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case DELETE_APPLICATION_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((application) => application._id !== action.payload)
      };
    case DELETE_APPLICATION_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
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
