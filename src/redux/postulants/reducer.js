import {
  GET_POSTULANTS_FETCHING,
  GET_POSTULANTS_FULFILLED,
  GET_POSTULANTS_REJECTED,
  GET_ONE_POSTULANT_FETCHING,
  GET_ONE_POSTULANT_FULFILLED,
  GET_ONE_POSTULANT_REJECTED,
  ADD_POSTULANT_FETCHING,
  ADD_POSTULANT_FULFILLED,
  ADD_POSTULANT_REJECTED,
  UPDATE_POSTULANT_FETCHING,
  UPDATE_POSTULANT_FULFILLED,
  UPDATE_POSTULANT_REJECTED,
  DELETE_POSTULANT_FETCHING,
  DELETE_POSTULANT_FULFILLED,
  DELETE_POSTULANT_REJECTED,
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
    case GET_POSTULANTS_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case GET_POSTULANTS_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        error: false,
        list: action.payload
      };
    }
    case GET_POSTULANTS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true
      };

    case GET_ONE_POSTULANT_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case GET_ONE_POSTULANT_FULFILLED:
      return {
        ...state,
        selected: action.payload,
        isLoading: false
      };
    case GET_ONE_POSTULANT_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload
      };

    case ADD_POSTULANT_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case ADD_POSTULANT_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload]
      };
    case ADD_POSTULANT_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true
      };

    case UPDATE_POSTULANT_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case UPDATE_POSTULANT_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list]
      };
    case UPDATE_POSTULANT_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload
      };

    case DELETE_POSTULANT_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case DELETE_POSTULANT_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((postulant) => postulant._id !== action.payload)
      };
    case DELETE_POSTULANT_REJECTED:
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
