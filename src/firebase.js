import firebase from "firebase/app";
import "firebase/auth";


export const auth = firebase.initializeApp({

    apiKey: "AIzaSyBjplR9zMPdriV-9cmmKqgxw33pwCnFopU",
    authDomain: "botogram-b63be.firebaseapp.com",
    projectId: "botogram-b63be",
    storageBucket: "botogram-b63be.appspot.com",
    messagingSenderId: "12386901265",
    appId: "1:12386901265:web:3ced39b3303b96954380b0",

}).auth();


