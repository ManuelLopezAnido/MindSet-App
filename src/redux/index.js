import { combineReducers } from 'redux';
import adminsReducer from './admins/reducer';
import sessionsReducer from './sessions/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  sessions: sessionsReducer
});

export default rootReducer;
