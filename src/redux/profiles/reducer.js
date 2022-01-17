import {
  GET_PROFILES_FETCHING,
  GET_PROFILES_FULFILLED,
  GET_PROFILES_REJECTED,
  GET_ONE_PROFILE_FETCHING,
  GET_ONE_PROFILE_FULFILLED,
  GET_ONE_PROFILE_REJECTED,
  ADD_PROFILE_FETCHING,
  ADD_PROFILE_FULFILLED,
  ADD_PROFILE_REJECTED,
  UPDATE_PROFILE_FETCHING,
  UPDATE_PROFILE_FULFILLED,
  UPDATE_PROFILE_REJECTED,
  DELETE_PROFILE_FETCHING,
  DELETE_PROFILE_FULFILLED,
  DELETE_PROFILE_REJECTED,
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
    case GET_PROFILES_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case GET_PROFILES_FULFILLED:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: action.payload.workProfiles
      };
    case GET_PROFILES_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true
      };

    case GET_ONE_PROFILE_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case GET_ONE_PROFILE_FULFILLED: {
      return {
        ...state,
        selected: action.payload.workProfile,
        isLoading: false
      };
    }
    case GET_ONE_PROFILE_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload
      };

    case ADD_PROFILE_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case ADD_PROFILE_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload]
      };
    case ADD_PROFILE_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true
      };

    case UPDATE_PROFILE_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case UPDATE_PROFILE_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list]
      };
    case UPDATE_PROFILE_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload
      };

    case DELETE_PROFILE_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true
      };
    case DELETE_PROFILE_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((profile) => profile._id !== action.payload)
      };
    case DELETE_PROFILE_REJECTED:
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
