import {
  GET_POSITIONS_FETCHING,
  GET_POSITIONS_FULFILLED,
  GET_POSITIONS_REJECTED,
  GET_ONE_POSITION_FETCHING,
  GET_ONE_POSITION_FULFILLED,
  GET_ONE_POSITION_REJECTED,
  ADD_POSITION_FETCHING,
  ADD_POSITION_FULFILLED,
  ADD_POSITION_REJECTED,
  UPDATE_POSITION_FETCHING,
  UPDATE_POSITION_FULFILLED,
  UPDATE_POSITION_REJECTED,
  DELETE_POSITION_FETCHING,
  DELETE_POSITION_FULFILLED,
  DELETE_POSITION_REJECTED,
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

    case GET_ONE_POSITION_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_ONE_POSITION_FULFILLED:
      return {
        ...state,
        selected: action.payload,
        isLoading: false
      };
    case GET_ONE_POSITION_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case ADD_POSITION_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_POSITION_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: []
      };
    case ADD_POSITION_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case UPDATE_POSITION_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_POSITION_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list]
      };
    case UPDATE_POSITION_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case DELETE_POSITION_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_POSITION_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((pos) => pos._id !== action.payload)
      };
    case DELETE_POSITION_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
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
