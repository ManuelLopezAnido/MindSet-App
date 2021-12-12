import { combineReducers } from 'redux';
import counselorsReducer from './counselors/reducer';
import postulantsReducer from './postulants/reducer';

const rootReducer = combineReducers({
  counselors: counselorsReducer,
  postulants: postulantsReducer
});

export default rootReducer;
