import { combineReducers } from 'redux';

import authReducer from './modules/auth/slice';
import dataAssessmentReducer from './modules/assessment';

export const rootReducer = combineReducers({
  auth: authReducer,
  dataAssessment: dataAssessmentReducer,
});
