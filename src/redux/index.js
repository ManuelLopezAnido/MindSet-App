import { combineReducers } from 'redux';
import adminsReducer from './admins/reducer';
import positionsReducer from './positions/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  positions: positionsReducer
});

export default rootReducer;
