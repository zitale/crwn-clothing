import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyC9waeT1bUpUrAsUldQ1dWLPb-qjuwyzkY",
  authDomain: "crwn-db-7b212.firebaseapp.com",
  projectId: "crwn-db-7b212",
  storageBucket: "crwn-db-7b212.appspot.com",
  messagingSenderId: "365107979916",
  appId: "1:365107979916:web:bb92ed3cf22ea4d2253da9",
  measurementId: "G-09SS4S556D"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'})

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;