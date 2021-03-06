import firebase from '../configureFirebase';
import * as types from '../constants/ActionTypes';
import {
  actionStart,
  actionFailed,
  actionSuccess
} from './utils/actionStatusMiddleware';
import { fetchList } from './timeEntries';

export const changeText = (uid, text) => dispatch => {
  dispatch(
    actionStart(types.TIME_ENTRY_INPUT__CHANGE_TEXT, {
      payload: {
        text
      }
    })
  );

  const promise = firebase
    .database()
    .ref('timeEntryInputs/' + uid)
    .update({ text });
  promise
    .then(data => {
      dispatch(
        actionSuccess(types.TIME_ENTRY_INPUT__CHANGE_TEXT, {
          payload: {
            text
          }
        })
      );
    })
    .catch(() => {
      dispatch(actionFailed(types.TIME_ENTRY_INPUT__CHANGE_TEXT));
    });

  return promise;
};

export const changeStartTime = (uid, date) => dispatch => {
  dispatch(
    actionStart(types.TIME_ENTRY_INPUT__CHANGE_START_TIME, {
      payload: {
        startTime: date
      }
    })
  );

  const promise = firebase
    .database()
    .ref('timeEntryInputs/' + uid)
    .update({ startTime: date.getTime() });
  promise
    .then(data => {
      dispatch(
        actionSuccess(types.TIME_ENTRY_INPUT__CHANGE_START_TIME, {
          payload: {
            startTime: date
          }
        })
      );
    })
    .catch(() => {
      dispatch(actionFailed(types.TIME_ENTRY_INPUT__CHANGE_START_TIME));
    });
  return promise;
};

export const stop = (uid, text, date) => dispatch => {
  dispatch(actionStart(types.TIME_ENTRY_INPUT__STOP));

  //create complete time entry
  const newEntryRef = firebase
    .database()
    .ref('timeEntries/' + uid)
    .push();
  const now = new Date();
  const newEntryPromise = newEntryRef.set({
    text: text,
    startTime: date.getTime(),
    endTime: now.getTime()
  });
  //delete current tracking entry
  newEntryPromise
    .then(function() {
      const deleteEntryPromise = firebase
        .database()
        .ref('timeEntryInputs/' + uid)
        .remove();
      deleteEntryPromise
        .then(function() {
          dispatch(actionSuccess(types.TIME_ENTRY_INPUT__STOP));
          dispatch(fetchList(uid));
        })
        .catch(function() {
          dispatch(actionFailed(types.TIME_ENTRY_INPUT__STOP));
        });
    })
    .catch(function() {
      dispatch(actionFailed(types.TIME_ENTRY_INPUT__STOP));
    });
};

//Pull tracking entry from server
export const pull = uid => dispatch => {
  dispatch(actionStart(types.TIME_ENTRY_INPUT__PULL));

  return new Promise((resolve, reject) => {
    const ref = firebase.database().ref('timeEntryInputs/' + uid);
    ref.once('value', function(snapshot) {
      const entry = snapshot.val();
      if (entry) {
        const payload = {
          text: entry.text,
          startTime: entry.startTime
        };

        dispatch(
          actionSuccess(types.TIME_ENTRY_INPUT__PULL, { payload: payload })
        );
      } else {
        dispatch(
          actionSuccess(types.TIME_ENTRY_INPUT__PULL, { payload: null })
        );
      }
      resolve();
    });
  });
};

export const start = (uid, text, date) => dispatch => {
  dispatch(
    actionStart(types.TIME_ENTRY_INPUT__START, {
      payload: {
        text,
        startTime: date
      }
    })
  );

  const entryData = {
    text,
    startTime: date.getTime()
  };

  firebase
    .database()
    .ref('timeEntryInputs/' + uid)
    .set(entryData)
    .then(data => {
      dispatch(
        actionSuccess(types.TIME_ENTRY_INPUT__START, {
          payload: {
            text,
            startTime: date
          }
        })
      );
    })
    .catch(() => {
      dispatch(actionFailed(types.TIME_ENTRY_INPUT__START));
    });
};

export const remove = uid => dispatch => {
  dispatch(actionStart(types.TIME_ENTRY_INPUT__REMOVE));

  firebase
    .database()
    .ref('timeEntryInputs/' + uid)
    .remove()
    .then(function() {
      dispatch(actionSuccess(types.TIME_ENTRY_INPUT__REMOVE));
    })
    .catch(function() {
      dispatch(actionFailed(types.TIME_ENTRY_INPUT__REMOVE));
    });
};
