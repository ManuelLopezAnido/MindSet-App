import {
  GET_COUNSELORS_FETCHING,
  GET_COUNSELORS_FULFILLED,
  GET_COUNSELORS_REJECTED,
  GET_ONE_COUNSELOR_FETCHING,
  GET_ONE_COUNSELOR_FULFILLED,
  GET_ONE_COUNSELOR_REJECTED,
  ADD_COUNSELOR_FETCHING,
  ADD_COUNSELOR_FULFILLED,
  ADD_COUNSELOR_REJECTED,
  UPDATE_COUNSELOR_FETCHING,
  UPDATE_COUNSELOR_FULFILLED,
  UPDATE_COUNSELOR_REJECTED,
  DELETE_COUNSELOR_FETCHING,
  DELETE_COUNSELOR_FULFILLED,
  DELETE_COUNSELOR_REJECTED,
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
    case GET_COUNSELORS_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case GET_COUNSELORS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: action.payload.data
      };
    case GET_COUNSELORS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true
      };

    case GET_ONE_COUNSELOR_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case GET_ONE_COUNSELOR_FULFILLED:
      return {
        ...state,
        selected: action.payload.data,
        isLoading: false
      };
    case GET_ONE_COUNSELOR_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload
      };

    case ADD_COUNSELOR_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case ADD_COUNSELOR_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload]
      };
    case ADD_COUNSELOR_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true
      };

    case UPDATE_COUNSELOR_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case UPDATE_COUNSELOR_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list]
      };
    case UPDATE_COUNSELOR_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload
      };

    case DELETE_COUNSELOR_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case DELETE_COUNSELOR_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((counselor) => counselor._id !== action.payload)
      };
    case DELETE_COUNSELOR_REJECTED:
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
