import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CLEAN_ERROR,
  SET_AUTHENTICATION
} from './constants';

const initialState = {
  isLoading: false,
  authenticated: false,
  error: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        authenticated: true
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case CLEAN_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: initialState.error
      };
    }
    case SET_AUTHENTICATION: {
      return {
        ...state,
        isFetching: false,
        authenticated: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
