import { combineReducers } from 'redux';
import counselorsReducer from 'redux/counselors/reducer';
import adminsReducer from 'redux/admins/reducer';
import sessionsReducer from 'redux/sessions/reducer';
import clientsReducer from 'redux/clients/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  sessions: sessionsReducer,
  counselors: counselorsReducer,
  clients: clientsReducer
});

export default rootReducer;
