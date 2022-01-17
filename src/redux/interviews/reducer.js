import {
  GET_INTERVIEWS_FETCHING,
  GET_INTERVIEWS_FULFILLED,
  GET_INTERVIEWS_REJECTED,
  GET_ONE_INTERVIEW_FETCHING,
  GET_ONE_INTERVIEW_FULFILLED,
  GET_ONE_INTERVIEW_REJECTED,
  UPDATE_INTERVIEW_FETCHING,
  UPDATE_INTERVIEW_FULFILLED,
  UPDATE_INTERVIEW_REJECTED,
  ADD_INTERVIEW_FETCHING,
  ADD_INTERVIEW_FULFILLED,
  ADD_INTERVIEW_REJECTED,
  DELETE_INTERVIEW_FETCHING,
  DELETE_INTERVIEW_FULFILLED,
  DELETE_INTERVIEW_REJECTED,
  ERROR_TO_DEFAULT
} from './constants';

const initialState = {
  isLoading: false,
  list: [],
  error: '',
  selected: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INTERVIEWS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_INTERVIEWS_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        list: action.payload,
        selected: {}
      };
    }
    case GET_INTERVIEWS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case GET_ONE_INTERVIEW_FETCHING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_ONE_INTERVIEW_FULFILLED: {
      return {
        ...state,
        selected: action.payload,
        isLoading: false
      };
    }
    case GET_ONE_INTERVIEW_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case ADD_INTERVIEW_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_INTERVIEW_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload]
      };
    }
    case ADD_INTERVIEW_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case UPDATE_INTERVIEW_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case UPDATE_INTERVIEW_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list]
      };
    case UPDATE_INTERVIEW_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload
      };

    case DELETE_INTERVIEW_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_INTERVIEW_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((interview) => interview._id !== action.payload)
      };
    case DELETE_INTERVIEW_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case ERROR_TO_DEFAULT: {
      return {
        ...state,
        error: ''
      };
    }
    default:
      return state;
  }
};

export default reducer;
