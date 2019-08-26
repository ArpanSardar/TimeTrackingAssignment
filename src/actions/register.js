import firebase from '../configureFirebase';
import * as types from '../constants/ActionTypes';
import {
  actionStart,
  actionFailed,
  actionSuccess
} from './utils/actionStatusMiddleware';

export const register = (email, password) => dispatch => {
  dispatch(actionStart(types.REGISTER));
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(actionSuccess(types.REGISTER, { user: user }));
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
      dispatch(actionFailed(types.REGISTER, errorMessage));
    });
};
