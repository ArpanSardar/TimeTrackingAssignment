import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyDM5OfTk6Tx0l12Z455LX5LCOkRbomPqIU',
  authDomain: 'timetracking-e2c86.firebaseapp.com',
  databaseURL: 'https://timetracking-e2c86.firebaseio.com',
  projectId: 'timetracking-e2c86',
  storageBucket: '',
  messagingSenderId: '949931111957',
  appId: '1:949931111957:web:b23f38cf054861de'
};

firebase.initializeApp(config);

export default firebase;
