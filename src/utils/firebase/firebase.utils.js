import { initializeApp } from 'firebase/app';
import { getAuth,
    signInWithRedirect,
    signInWithPopup,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCLzhzUc_686StK8YHtplYClAMnkEaXDok",  
    authDomain: "react-ecommerce-f3ae9.firebaseapp.com",  
    projectId: "react-ecommerce-f3ae9",  
    storageBucket: "react-ecommerce-f3ae9.appspot.com",  
    messagingSenderId: "309747538162",  
    appId: "1:309747538162:web:395f8c756964d66e36986b"  
  };
  
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirection = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (authData, additionalInfo) => {
    if (!authData) return;

    const userDocRef = doc(db, 'users', authData.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        const { uid, displayName, email } = authData;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                uid, displayName, email, createdAt,
                ...additionalInfo
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
};