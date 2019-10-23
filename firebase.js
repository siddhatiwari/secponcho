import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyDmnZ8A5RxhKypIWmhpSUZSRG4ZyXfLnBg",
  authDomain: "secponcho.firebaseapp.com",
  databaseURL: "https://secponcho.firebaseio.com",
  projectId: "secponcho",
  storageBucket: "secponcho.appspot.com",
  messagingSenderId: "116017237827",
  appId: "1:116017237827:web:55138f0ae9d42ae0a929f6"
});

const rdb = firebase.database();

export { rdb, firebase };