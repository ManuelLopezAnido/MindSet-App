import { combineReducers } from 'redux';
import adminsReducer from './admins/reducer';
import counselorsReducer from './counselors/reducer';
import postulantsReducer from './postulants/reducer';
import clientsReducer from './clients/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  clients: clientsReducer,
  counselors: counselorsReducer,
  postulants: postulantsReducer
});

export default rootReducer;
