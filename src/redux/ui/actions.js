import { CHANGE_WIZARD_STEP } from './constants';

export const changeStep = (stepNum) => {
  return { type: CHANGE_WIZARD_STEP, payload: stepNum };
};
