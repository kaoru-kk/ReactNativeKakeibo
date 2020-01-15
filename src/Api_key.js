import firebase from "firebase";
import 'firebase/firestore';

const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
}

let firebaseApp =  firebase.initializeApp(config);
let db = firebaseApp.firestore();

export default config;
export {db};
