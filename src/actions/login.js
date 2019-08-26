import firebase from '../configureFirebase';
import * as types from '../constants/ActionTypes';
import { fetchList } from './timeEntries';
import {
  actionStart,
  actionFailed,
  actionSuccess
} from './utils/actionStatusMiddleware';

export const login = (email, password) => dispatch => {
  dispatch(actionStart(types.LOGIN));
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(actionSuccess(types.LOGIN, { user: user }));
    })
    .catch(function(error) {
      let errorMessage;

      switch (error.code) {
        case 'auth/weak-password':
          errorMessage = 'The password is too weak.';
          break;
        default:
          errorMessage = error.message;
      }
      dispatch(actionFailed(types.LOGIN, errorMessage));
    });
};
