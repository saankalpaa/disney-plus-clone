import firebase from 'firebase';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCA61W3sNEJV-uYh3dAW5wWGMh8GTmnVbM",
    authDomain: "disney-plus-clone-ca265.firebaseapp.com",
    projectId: "disney-plus-clone-ca265",
    storageBucket: "disney-plus-clone-ca265.appspot.com",
    messagingSenderId: "515121254987",
    appId: "1:515121254987:web:a1910bcb767995d33fb3ce",
    measurementId: "G-EZPFSRD8HF"
};

const firebaseApp =  firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export {auth, provider, storage};
export default db; 