import { combineReducers } from 'redux';
import counselorsReducer from './counselors/reducer';
import adminsReducer from './admins/reducer';
import postulantsReducer from './postulants/reducer';
import sessionsReducer from './sessions/reducer';
import clientsReducer from './clients/reducer';
import uiReducer from './ui/reducer';
import applicationsReducers from './applications/reducer';
import interviewsReducers from './interviews/reducer';
import positionsReducer from './positions/reducer';
import authReducer from './auth/reducer';
import profilesReducer from './profiles/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  clients: clientsReducer,
  postulants: postulantsReducer,
  sessions: sessionsReducer,
  counselors: counselorsReducer,
  ui: uiReducer,
  applications: applicationsReducers,
  auth: authReducer,
  interviews: interviewsReducers,
  positions: positionsReducer,
  profiles: profilesReducer
});

export default rootReducer;
