import { combineReducers } from 'redux';
import counselorsReducer from './counselors/reducer';
import adminsReducer from './admins/reducer';
import sessionsReducer from './sessions/reducer';
import clientsReducer from './clients/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  sessions: sessionsReducer,
  counselors: counselorsReducer,
  clients: clientsReducer
});

export default rootReducer;
