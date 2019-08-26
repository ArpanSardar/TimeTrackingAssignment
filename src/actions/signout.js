import firebase from '../configureFirebase';
import history from '../history';
import * as types from '../constants/ActionTypes';
import {
  actionStart,
  actionFailed,
  actionSuccess
} from './utils/actionStatusMiddleware';

export const signout = () => dispatch => {
  dispatch(actionStart(types.SIGNOUT));

  return firebase
    .auth()
    .signOut()
    .then(function() {
      // console.log('signout success');
      dispatch(actionSuccess(types.SIGNOUT));
      history.push('/login');
    })
    .catch(function() {
      // console.log('signout fail');
      dispatch(actionFailed(types.SIGNOUT));
    });
};
