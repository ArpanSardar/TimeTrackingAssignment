import firebase from '../configureFirebase';
import * as types from '../constants/ActionTypes';
import {
  actionStart,
  actionFailed,
  actionSuccess
} from './utils/actionStatusMiddleware';

// Check if user already logged in with current browser
export const isUserLoggedIn = () => dispatch => {
  dispatch(actionStart(types.IS_USER_LOGGEDIN));

  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        dispatch(actionSuccess(types.IS_USER_LOGGEDIN, { user: user }));
        resolve();
      } else {
        dispatch(actionFailed(types.IS_USER_LOGGEDIN));
        resolve();
      }
    });
  });
};
