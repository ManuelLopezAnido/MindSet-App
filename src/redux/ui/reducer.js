import { CHANGE_WIZARD_STEP } from './constants';

const initialState = {
  step: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_WIZARD_STEP:
      return {
        ...state,
        step: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
