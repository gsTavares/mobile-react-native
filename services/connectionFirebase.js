import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyA_rdWWq3MZJppfNDUi-u0Q-Hyk84fN_G0",
    authDomain: "react-native-auth-7a93c.firebaseapp.com",
    projectId: "react-native-auth-7a93c",
    storageBucket: "react-native-auth-7a93c.appspot.com",
    messagingSenderId: "491615820831",
    appId: "1:491615820831:web:9827a046488560a774892a"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;