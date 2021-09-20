import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyAlyzCuwQsGQIM_JYBoW-QKdVPYp0K6oog",
    authDomain: "firevue-7482a.firebaseapp.com",
    projectId: "firevue-7482a",
    storageBucket: "firevue-7482a.appspot.com",
    messagingSenderId: "343782850466",
    appId: "1:343782850466:web:181cb7bc7d24cc1317fcfb"
};

// Initialize Firebase
if (!firebase.apps.length) {
 firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();
const marcaTiempo = firebase.firestore.FieldValue.serverTimestamp;


firebase.getCurrentUser = () => {
        return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            unsubscribe();
            resolve(user);
        }, reject);
        });
    };


export { db, auth, firebase, marcaTiempo };