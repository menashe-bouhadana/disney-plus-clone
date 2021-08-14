import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBmhpge5g7l3pKYVIE55E1lX3kKXt5V5Ow",
    authDomain: "disneyplus-clone-54120.firebaseapp.com",
    projectId: "disneyplus-clone-54120",
    storageBucket: "disneyplus-clone-54120.appspot.com",
    messagingSenderId: "548349403249",
    appId: "1:548349403249:web:f42a0b3e576f3d0d49bbd0",
    measurementId: "G-VDQYHXWEW9",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export {auth, provider, storage};
export default db;