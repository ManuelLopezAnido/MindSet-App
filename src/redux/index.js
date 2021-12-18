import { combineReducers } from 'redux';
import counselorsReducer from './counselors/reducer';
import adminsReducer from './admins/reducer';
import postulantsReducer from './postulants/reducer';
import clientsReducer from './clients/reducer';

const rootReducer = combineReducers({
  counselors: counselorsReducer,
  admins: adminsReducer,
  clients: clientsReducer,
  postulants: postulantsReducer
});

export default rootReducer;
