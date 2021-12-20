import { combineReducers } from 'redux';
import counselorsReducer from './counselors/reducer';
import adminsReducer from './admins/reducer';
import positionsReducer from './positions/reducer';
import postulantsReducer from './postulants/reducer';
import sessionsReducer from './sessions/reducer';
import clientsReducer from './clients/reducer';
import uiReducer from './ui/reducer';
import applicationsReducers from './applications/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  positions: positionsReducer,
  clients: clientsReducer,
  postulants: postulantsReducer,
  sessions: sessionsReducer,
  counselors: counselorsReducer,
  ui: uiReducer,
  applications: applicationsReducers
});

export default rootReducer;
