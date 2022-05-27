import firebase from "firebase/compat/app"

const FIREBASE_CONFIG = {
  
};

export default function firebaseClient() {
  if(!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
}