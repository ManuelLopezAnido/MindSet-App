import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';

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
    default: {
      return state;
    }
  }
};

export default reducer;
