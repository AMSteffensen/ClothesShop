import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
        apiKey: "AIzaSyAeF7Pr-1Yd2MESy4ePtMx0VydWa4Uv9NY",
        authDomain: "crwn-db-b4b93.firebaseapp.com",
        databaseURL: "https://crwn-db-b4b93.firebaseio.com",
        projectId: "crwn-db-b4b93",
        storageBucket: "crwn-db-b4b93.appspot.com",
        messagingSenderId: "759623086512",
        appId: "1:759623086512:web:3500f04b32bf5cd3c92675",
        measurementId: "G-KCCJ7Q99DW"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
        if(!userAuth) return;

        const userRef = firestore.doc(`users/${userAuth.uid}`);
        const snapShot = await userRef.get();

        if(!snapShot.exists) {
                const { displayName, email } = userAuth;
                const createdAt = new Date();
        

        try {
                await userRef.set({
                        displayName,
                        email,
                        createdAt,
                        ...additionalData
                })
        } catch (error) {
                console.log('catching created user', error.message);
        }
}

        return userRef;
}
 
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;