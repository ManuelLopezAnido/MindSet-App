import {
  GET_ADMINS_FETCHING,
  GET_ADMINS_FULFILLED,
  GET_ADMINS_REJECTED,
  GET_ONE_ADMIN_FETCHING,
  GET_ONE_ADMIN_FULFILLED,
  GET_ONE_ADMIN_REJECTED,
  ADD_ADMIN_FETCHING,
  ADD_ADMIN_FULFILLED,
  ADD_ADMIN_REJECTED,
  UPDATE_ADMIN_FETCHING,
  UPDATE_ADMIN_FULFILLED,
  UPDATE_ADMIN_REJECTED,
  DELETE_ADMIN_FETCHING,
  DELETE_ADMIN_FULFILLED,
  DELETE_ADMIN_REJECTED
} from './constants';

const initialState = {
  isLoading: false,
  list: [],
  error: '',
  selected: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMINS_FETCHING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_ADMINS_FULFILLED: {
      console.log(action);
      return {
        ...state,
        isLoading: false,
        list: action.payload.Admins
      };
    }
    case GET_ADMINS_REJECTED: {
      console.log(action.error);
      return {
        ...state,
        isLoading: false,
        error: true //TODO: CHANGE THIS
      };
    }

    case GET_ONE_ADMIN_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_ONE_ADMIN_FULFILLED:
      return {
        ...state,
        selected: action.payload,
        isLoading: false
      };
    case GET_ONE_ADMIN_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true //TODO: CHANGE THIS
      };

    case ADD_ADMIN_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_ADMIN_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload]
      };
    case ADD_ADMIN_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true //TODO: CHANGE THIS
      };

    case UPDATE_ADMIN_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_ADMIN_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list]
      };
    case UPDATE_ADMIN_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true //TODO: CHANGE THIS
      };

    case DELETE_ADMIN_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_ADMIN_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((admin) => admin._id !== action.payload)
      };
    }
    case DELETE_ADMIN_REJECTED: {
      console.log('entre al DELETE_ADMIN_REJECTED REDUCER');
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
};

export default reducer;
