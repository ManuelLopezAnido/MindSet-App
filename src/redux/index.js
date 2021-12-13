import { combineReducers } from 'redux';
import adminsReducer from './admins/reducer';
import clientsReducer from './clients/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  clients: clientsReducer
});

export default rootReducer;
