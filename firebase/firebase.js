import * as firebase from 'firebase';
import 'firebase/firestore';
import "firebase/auth";
import "firebase/database"
import firebaseConfig from "./firebase-config";

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = firebase.firestore();
const realTime = myFirebase.database();
export const db = baseDb;
export default realTime;