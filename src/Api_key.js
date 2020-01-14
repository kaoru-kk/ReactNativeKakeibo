import firebase from "firebase";
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyCZzW8ErWsgysg7sorvmLlO8EwyW3T8DUk",
    authDomain: "kakeibo-a0ef8.firebaseapp.com",
    databaseURL: "https://kakeibo-a0ef8.firebaseio.com",
    projectId: "kakeibo-a0ef8",
    storageBucket: "kakeibo-a0ef8.appspot.com",
    messagingSenderId: "661128524394",
    appId: "1:661128524394:web:858835325c97ec340d5013",
    measurementId: "G-VK7QLYLT6N"
}

let firebaseApp =  firebase.initializeApp(config);
let db = firebaseApp.firestore();

export default config;
export {db};