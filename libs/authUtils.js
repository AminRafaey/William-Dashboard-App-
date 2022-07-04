//? HANDLES OUR EMAIL SIGNIN FROM THE LOGIN.JS PAGE

import firebase from './initFirebase';

export const signInWithEmail = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
};

