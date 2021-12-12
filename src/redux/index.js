import { combineReducers } from 'redux';
import counselorsReducer from './counselors/reducer';

const rootReducer = combineReducers({
  counselors: counselorsReducer
});

export default rootReducer;
