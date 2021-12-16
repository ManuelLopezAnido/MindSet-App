import { combineReducers } from 'redux';
import adminsReducer from './admins/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer
});

export default rootReducer;
