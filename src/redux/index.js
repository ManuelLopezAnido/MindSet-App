import { combineReducers } from 'redux';
import counselorsReducer from './counselors/reducer';
import adminsReducer from './admins/reducer';
import postulantsReducer from './postulants/reducer';
import sessionsReducer from './sessions/reducer';
import clientsReducer from './clients/reducer';
import applicationsReducers from './applications/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  clients: clientsReducer,
  postulants: postulantsReducer,
  sessions: sessionsReducer,
  counselors: counselorsReducer,
  applications: applicationsReducers
});

export default rootReducer;
