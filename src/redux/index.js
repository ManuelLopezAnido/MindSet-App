import { combineReducers } from 'redux';
import adminsReducer from './admins/reducer';
import applicationsReducers from './applications/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  applications: applicationsReducers
});

export default rootReducer;
