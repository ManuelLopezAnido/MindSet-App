import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR, CLEAN_ERROR } from './constants';

const initialState = {
  isLoading: false,
  authenticated: {},
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
      console.log('action payload login Success', action.payload);
      return {
        ...state,
        isFetching: false,
        authenticated: action.payload,
        error: ''
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
    default: {
      return state;
    }
  }
};

export default reducer;
