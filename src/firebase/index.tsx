
import { initializeApp, getApps, getApp, FirebaseOptions } from "firebase/app";
import { getFirestore, Firestore, collection, addDoc, CollectionReference, Timestamp } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { createContext, useContext } from 'react';

const firebaseConfig: FirebaseOptions = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);

interface FirebaseContextValue {
    auth: Auth;
    firestore: Firestore;
}

const FirebaseContext = createContext<FirebaseContextValue | null>(null);

export const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <FirebaseContext.Provider value={{ auth, firestore }}>
            {children}
        </FirebaseContext.Provider>
    );
};

export const useFirebase = () => {
    const context = useContext(FirebaseContext);
    if (context === null) {
        throw new Error('useFirebase must be used within a FirebaseProvider');
    }
    return context;
};

export const addDocumentNonBlocking = <T extends {}> (ref: CollectionReference<T>, data: T) => {
    addDoc(ref, {
        ...data,
        createdAt: Timestamp.now()
    })
    .catch(err => {
        console.error(`Failed to add document non-blocking: ${err.message}`);
    });
}
