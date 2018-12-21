import firebase from "firebase";
var config = {
    apiKey: "AIzaSyBzjnxpXnOt4Vr6wp5IyDqpyZV62jd7R-k",
    authDomain: "taskator-179c9.firebaseapp.com",
    databaseURL: "https://taskator-179c9.firebaseio.com",
    projectId: "taskator-179c9",
    storageBucket: "taskator-179c9.appspot.com",
    messagingSenderId: "176867119845"
};
firebase.initializeApp(config);
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

export {db}
export default firebase;