import {
  GET_POSITIONS_FETCHING,
  GET_POSITIONS_FULFILLED,
  GET_POSITIONS_REJECTED,
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
    case GET_POSITIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_POSITIONS_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        list: action.payload,
        selected: {}
      };
    }
    case GET_POSITIONS_REJECTED:
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
