import { combineReducers } from 'redux';
import auth from './auth';
import timeEntryInput from './timeEntryInput';
import timeEntries from './timeEntries';
import report from './report';

import * as types from '../constants/ActionTypes';

const appReducer = combineReducers({
  auth,
  timeEntryInput,
  timeEntries,
  report
});

const rootReducer = (state, action) => {
  //clear all state when signout
  if (action.type === types.SIGNOUT && action.status === 'success') {
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;
