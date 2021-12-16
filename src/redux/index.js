import { combineReducers } from 'redux';
import counselorsReducer from './counselors/reducer';
import adminsReducer from './admins/reducer';

const rootReducer = combineReducers({
  counselors: counselorsReducer,
  admins: adminsReducer
});

export default rootReducer;
